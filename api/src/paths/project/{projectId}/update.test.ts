import chai, { expect } from 'chai';
import { describe } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as update from './update';
import * as db from '../../../database/db';
import { IUpdateProject } from './update';
import * as project_delete_queries from '../../../queries/project/project-delete-queries';
import SQL from 'sql-template-strings';

chai.use(sinonChai);

describe('updateProjectPermitData', () => {
  afterEach(() => {
    sinon.restore();
  });

  const dbConnectionObj = {
    systemUserId: () => {
      return null;
    },
    open: async () => {
      // do nothing
    },
    release: () => {
      // do nothing
    },
    commit: async () => {
      // do nothing
    },
    rollback: async () => {
      // do nothing
    },
    query: async () => {
      // do nothing
    }
  };

  const projectId = 1;
  const entities = {
    permit: {
      permits: [
        {
          permit_number: 1,
          permit_type: 'type',
          sampling_conducted: 'true'
        }
      ]
    },
    coordinator: {
      first_name: 'first',
      last_name: 'last',
      email_address: 'email@example.com',
      coordinator_agency: 'agency',
      share_contact_details: 'true',
      revision_count: 1
    }
  } as IUpdateProject;

  it('should throw a 400 error when no permit entities', async () => {
    sinon.stub(db, 'getDBConnection').returns({
      ...dbConnectionObj,
      systemUserId: () => {
        return 20;
      }
    });

    try {
      await update.updateProjectPermitData(
        projectId,
        { ...entities, permit: { ...entities.permit, permits: [] } },
        dbConnectionObj
      );

      expect.fail();
    } catch (actualError) {
      expect(actualError.status).to.equal(400);
      expect(actualError.message).to.equal('Missing request body entity `permit`');
    }
  });

  it('should throw a 400 error when failed to generate delete permit SQL', async () => {
    sinon.stub(db, 'getDBConnection').returns({
      ...dbConnectionObj,
      systemUserId: () => {
        return 20;
      }
    });

    sinon.stub(project_delete_queries, 'deletePermitSQL').returns(null);

    try {
      await update.updateProjectPermitData(projectId, entities, dbConnectionObj);

      expect.fail();
    } catch (actualError) {
      expect(actualError.status).to.equal(400);
      expect(actualError.message).to.equal('Failed to build SQL delete statement');
    }
  });

  it('should throw a 409 error when failed to delete permit', async () => {
    const mockQuery = sinon.stub();

    mockQuery.resolves(null);

    sinon.stub(db, 'getDBConnection').returns({
      ...dbConnectionObj,
      systemUserId: () => {
        return 20;
      },
      query: mockQuery
    });

    sinon.stub(project_delete_queries, 'deletePermitSQL').returns(SQL`something`);

    try {
      await update.updateProjectPermitData(projectId, entities, dbConnectionObj);

      expect.fail();
    } catch (actualError) {
      expect(actualError.status).to.equal(409);
      expect(actualError.message).to.equal('Failed to delete project permit data');
    }
  });
});