'use strict';

import { RequestHandler } from 'express';
import { Operation } from 'express-openapi';
import { SYSTEM_ROLE } from '../../../../../../../constants/roles';
import { getDBConnection } from '../../../../../../../database/db';
import { HTTP400 } from '../../../../../../../errors/CustomError';
import { getLogger } from '../../../../../../../utils/logger';
import { unsecureAttachmentRecordSQL } from '../../../../../../../queries/security/security-queries';

const defaultLog = getLogger('/api/project/{projectId}/survey/{surveyId}/attachments/{attachmentId}/makeUnsecure');

export const PUT: Operation = [makeSurveyAttachmentUnsecure()];

PUT.apiDoc = {
  description: 'Make security status of a survey attachment unsecure.',
  tags: ['attachment', 'security_status'],
  security: [
    {
      Bearer: [SYSTEM_ROLE.SYSTEM_ADMIN, SYSTEM_ROLE.PROJECT_ADMIN]
    }
  ],
  parameters: [
    {
      in: 'path',
      name: 'projectId',
      schema: {
        type: 'number'
      },
      required: true
    },
    {
      in: 'path',
      name: 'surveyId',
      schema: {
        type: 'number'
      },
      required: true
    },
    {
      in: 'path',
      name: 'attachmentId',
      schema: {
        type: 'number'
      },
      required: true
    }
  ],
  requestBody: {
    description: 'Current security token value and attachment type for survey attachment.',
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Survey attachment make unsecure security status response.',
      content: {
        'application/json': {
          schema: {
            title: 'Row count of record for which security status has been made unsecure',
            type: 'number'
          }
        }
      }
    },
    401: {
      $ref: '#/components/responses/401'
    },
    default: {
      $ref: '#/components/responses/default'
    }
  }
};

export function makeSurveyAttachmentUnsecure(): RequestHandler {
  return async (req, res) => {
    defaultLog.debug({
      label: 'Make security status of a survey attachment unsecure',
      message: 'params',
      req_params: req.params
    });

    if (!req.params.projectId) {
      throw new HTTP400('Missing required path param `projectId`');
    }

    if (!req.params.surveyId) {
      throw new HTTP400('Missing required path param `projectId`');
    }

    if (!req.params.attachmentId) {
      throw new HTTP400('Missing required path param `attachmentId`');
    }

    if (!req.body || !req.body.attachmentType || !req.body.securityToken) {
      throw new HTTP400('Missing required request body');
    }

    const connection = getDBConnection(req['keycloak_token']);

    try {
      await connection.open();

      const unsecureRecordSQLStatement =
        req.body.attachmentType === 'Report'
          ? unsecureAttachmentRecordSQL('survey_report_attachment', req.body.securityToken)
          : unsecureAttachmentRecordSQL('survey_attachment', req.body.securityToken);

      if (!unsecureRecordSQLStatement) {
        throw new HTTP400('Failed to build SQL unsecure record statement');
      }

      const unsecureRecordSQLResponse = await connection.query(
        unsecureRecordSQLStatement.text,
        unsecureRecordSQLStatement.values
      );

      if (!unsecureRecordSQLResponse || !unsecureRecordSQLResponse.rowCount) {
        throw new HTTP400('Failed to unsecure record');
      }

      await connection.commit();

      return res.status(200).json(1);
    } catch (error) {
      defaultLog.error({ label: 'makeSurveyAttachmentUnsecure', message: 'error', error });
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };
}