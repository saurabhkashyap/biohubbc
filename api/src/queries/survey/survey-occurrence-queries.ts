import { SQL, SQLStatement } from 'sql-template-strings';
import { getLogger } from '../../utils/logger';

const defaultLog = getLogger('queries/survey/survey-occurrence-queries');

/**
 * SQL query to insert a survey occurrence submission row.
 *
 * @param {number} surveyId
 * @param {string} source
 * @param {string} key
 * @return {*}  {(SQLStatement | null)}
 */
export const insertSurveyOccurrenceSubmissionSQL = (
  surveyId: number,
  source: string,
  file_name: string
): SQLStatement | null => {
  defaultLog.debug({
    label: 'insertSurveyOccurrenceSubmissionSQL',
    message: 'params',
    surveyId,
    source,
    file_name
  });

  if (!surveyId || !source || !file_name) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
    INSERT INTO occurrence_submission (
      survey_id,
      source,
      file_name,
      event_timestamp
    ) VALUES (
      ${surveyId},
      ${source},
      ${file_name},
      now()
    )
    RETURNING occurrence_submission_id as id;
  `;

  defaultLog.debug({
    label: 'insertSurveyOccurrenceSubmissionSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a survey occurrence submission row.
 *
 * @param {number} surveyId
 * @param {string} source
 * @param {string} key
 * @return {*}  {(SQLStatement | null)}
 */
export const updateSurveyOccurrenceSubmissionWithKeySQL = (submissionId: number, key: string): SQLStatement | null => {
  defaultLog.debug({
    label: 'uodateSurveyOccurrenceSubmissionWithKeySQL',
    message: 'params',
    submissionId,
    key
  });

  if (!submissionId || !key) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
    UPDATE occurrence_submission
    SET
      key=  ${key}
    WHERE
      occurrence_submission_id = ${submissionId}
    RETURNING occurrence_submission_id as id;
  `;

  defaultLog.debug({
    label: 'updateSurveyOccurrenceSubmissionWithKeySQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to get latest occurrence submission for a survey.
 *
 * @param {number} surveyId
 * @returns {SQLStatement} sql query object
 */
export const getLatestSurveyOccurrenceSubmissionSQL = (surveyId: number): SQLStatement | null => {
  defaultLog.debug({
    label: 'getLatestSurveyOccurrenceSubmissionSQL',
    message: 'params',
    surveyId
  });

  if (!surveyId) {
    return null;
  }

  const sqlStatement = SQL`
    SELECT
      os.occurrence_submission_id as id,
      os.survey_id,
      os.source,
      os.event_timestamp,
      os.key,
      os.file_name,
      ss.submission_status_id,
      ss.submission_status_type_id,
      sst.name as submission_status_type_name,
      sm.submission_message_id,
      sm.submission_message_type_id,
      sm.message,
      smt.name as submission_message_type_name
    FROM
      occurrence_submission as os
    LEFT OUTER JOIN
      submission_status as ss
    ON
      os.occurrence_submission_id = ss.occurrence_submission_id
    LEFT OUTER JOIN
      submission_status_type as sst
    ON
      sst.submission_status_type_id = ss.submission_status_type_id
    LEFT OUTER JOIN
      submission_message as sm
    ON
      sm.submission_status_id = ss.submission_status_id
    LEFT OUTER JOIN
      submission_message_type as smt
    ON
      smt.submission_message_type_id = sm.submission_message_type_id
    WHERE
      os.survey_id = ${surveyId}
    ORDER BY
      os.event_timestamp DESC
    LIMIT 1
    ;
  `;

  defaultLog.debug({
    label: 'getLatestSurveyOccurrenceSubmission',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to delete occurrence records by occurrence submission id.
 *
 * @param {number} occurrenceSubmissionId
 * @return {*}  {(SQLStatement | null)}
 */
export const deleteSurveyOccurrencesSQL = (occurrenceSubmissionId: number): SQLStatement | null => {
  defaultLog.debug({
    label: 'deleteSurveyOccurrencesSQL',
    message: 'params',
    occurrenceSubmissionId
  });

  if (!occurrenceSubmissionId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
    DELETE FROM
      occurrence
    WHERE
      occurrence_submission_id = ${occurrenceSubmissionId};
  `;

  defaultLog.debug({
    label: 'deleteSurveyOccurrencesSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to get the record for a single occurrence.
 *
 * @param {number} surveyId
 * @param {number} templateId
 * @returns {SQLStatement} sql query object
 */
export const getSurveyTemplateOccurrenceSQL = (surveyId: number, templateId: number): SQLStatement | null => {
  defaultLog.debug({ label: 'getSurveyTemplateOccurrenceSQL', message: 'params', surveyId });

  if (!surveyId || !templateId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
    SELECT *
    FROM
      occurrence_submission
    WHERE
      occurrence_submission_id = ${templateId};
  `;

  defaultLog.debug({
    label: 'getSurveyTemplateOccurrenceSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};