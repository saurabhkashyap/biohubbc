import { SQL, SQLStatement } from 'sql-template-strings';
import {
  PostCoordinatorData,
  PostFundingSource,
  PostLocationData,
  PostProjectData,
  PostObjectivesData,
  PostProjectObject
} from '../../models/project';
import { getLogger } from '../../utils/logger';
import { Feature } from 'geojson';

const defaultLog = getLogger('queries/project/project-create-queries');

/**
 * SQL query to insert a project row.
 *
 * @param {(PostProjectData & PostLocationData & PostCoordinatorData & PostObjectivesData)} project
 * @returns {SQLStatement} sql query object
 */
export const postProjectSQL = (
  project: PostProjectData & PostLocationData & PostCoordinatorData & PostObjectivesData
): SQLStatement | null => {
  defaultLog.debug({ label: 'postProjectSQL', message: 'params', PostProjectObject });

  if (!project) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
    INSERT INTO project (
      pt_id,
      name,
      objectives,
      location_description,
      start_date,
      end_date,
      caveats,
      comments,
      coordinator_first_name,
      coordinator_last_name,
      coordinator_email_address,
      coordinator_agency_name,
      coordinator_public,
      geography
    ) VALUES (
      ${project.type},
      ${project.name},
      ${project.objectives},
      ${project.location_description},
      ${project.start_date},
      ${project.end_date},
      ${project.caveats},
      ${project.comments},
      ${project.first_name},
      ${project.last_name},
      ${project.email_address},
      ${project.coordinator_agency},
      ${project.share_contact_details}
  `;

  if (project.geometry && project.geometry.length) {
    const geometryCollectionSQL = generateGeometryCollectionSQL(project.geometry);

    sqlStatement.append(SQL`
      ,public.geography(
        public.ST_Force2D(
          public.ST_SetSRID(
    `);

    sqlStatement.append(geometryCollectionSQL);

    sqlStatement.append(SQL`
      , 4326)))
    `);
  } else {
    sqlStatement.append(SQL`
      ,null
    `);
  }

  sqlStatement.append(SQL`
    )
    RETURNING
      id;
  `);

  defaultLog.debug({
    label: 'postProjectSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a focal species row.
 *
 * @param {string} species
 * @returns {SQLStatement} sql query object
 */
export const postFocalSpeciesSQL = (species: string, projectId: number): SQLStatement | null => {
  defaultLog.debug({ label: 'postFocalSpeciesSQL', message: 'params', postFocalSpeciesSQL, projectId });

  if (!species || !projectId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
      INSERT INTO focal_species (
        p_id,
        name
      ) VALUES (
        ${projectId},
        ${species}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postFocalSpeciesSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a ancillary species row.
 *
 * @param {string} species
 * @returns {SQLStatement} sql query object
 */
export const postAncillarySpeciesSQL = (species: string, projectId: number): SQLStatement | null => {
  defaultLog.debug({ label: 'postAncillarySpeciesSQL', message: 'params', postAncillarySpeciesSQL, projectId });

  if (!species || !projectId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
        INSERT INTO ancillary_species (
          p_id,
          name
        ) VALUES (
          ${projectId},
          ${species}
        )
        RETURNING
          id;
      `;

  defaultLog.debug({
    label: 'postAncillarySpeciesSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a project region row.
 *
 * @param {string} region
 * @returns {SQLStatement} sql query object
 */
export const postProjectRegionSQL = (region: string, projectId: number): SQLStatement | null => {
  defaultLog.debug({ label: 'postProjectRegionSQL', message: 'params', region, projectId });

  if (!region || !projectId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
      INSERT INTO project_region (
        p_id,
        name
      ) VALUES (
        ${projectId},
        ${region}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postProjectRegionSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a project funding source row.
 *
 * @param {PostFundingSource} fundingSource
 * @returns {SQLStatement} sql query object
 */
export const postProjectFundingSourceSQL = (
  fundingSource: PostFundingSource,
  projectId: number
): SQLStatement | null => {
  defaultLog.debug({ label: 'postProjectFundingSourceSQL', message: 'params', fundingSource, projectId });

  if (!fundingSource || !projectId) {
    return null;
  }

  // TODO model is missing agency name
  const sqlStatement: SQLStatement = SQL`
      INSERT INTO project_funding_source (
        p_id,
        iac_id,
        funding_source_project_id,
        funding_amount,
        funding_start_date,
        funding_end_date
      ) VALUES (
        ${projectId},
        ${fundingSource.investment_action_category},
        ${fundingSource.agency_project_id},
        ${fundingSource.funding_amount},
        ${fundingSource.start_date},
        ${fundingSource.end_date}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postProjectFundingSourceSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a project stakeholder partnership row.
 *
 * @param {string} stakeholderPartnership
 * @returns {SQLStatement} sql query object
 */
export const postProjectStakeholderPartnershipSQL = (
  stakeholderPartnership: string,
  projectId: number
): SQLStatement | null => {
  defaultLog.debug({
    label: 'postProjectStakeholderPartnershipSQL',
    message: 'params',
    stakeholderPartnership,
    projectId
  });

  if (!stakeholderPartnership || !projectId) {
    return null;
  }

  // TODO model is missing agency name
  const sqlStatement: SQLStatement = SQL`
      INSERT INTO stakeholder_partnership (
        p_id,
        name
      ) VALUES (
        ${projectId},
        ${stakeholderPartnership}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postPermitNumberWithSamplingSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a project indigenous nation row.
 *
 * @param {string} indigenousNationId
 * @returns {SQLStatement} sql query object
 */
export const postProjectIndigenousNationSQL = (indigenousNationId: number, projectId: number): SQLStatement | null => {
  defaultLog.debug({
    label: 'postProjectIndigenousNationSQL',
    message: 'params',
    indigenousNationId,
    projectId
  });

  if (!indigenousNationId || !projectId) {
    return null;
  }

  // TODO model is missing agency name
  const sqlStatement: SQLStatement = SQL`
      INSERT INTO project_first_nation (
        p_id,
        fn_id
      ) VALUES (
        ${projectId},
        ${indigenousNationId}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postProjectIndigenousNationSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/*
  Function to generate the SQL for insertion of a geometry collection
*/
function generateGeometryCollectionSQL(geometry: Feature[]): SQLStatement {
  if (geometry.length === 1) {
    const geo = JSON.stringify(geometry[0].geometry);

    return SQL`public.ST_GeomFromGeoJSON(${geo})`;
  }

  const sqlStatement: SQLStatement = SQL`public.ST_AsText(public.ST_Collect(array[`;

  geometry.forEach((geom: Feature, index: number) => {
    const geo = JSON.stringify(geom.geometry);

    // as long as it is not the last geometry, keep adding to the ST_collect
    if (index !== geometry.length - 1) {
      sqlStatement.append(SQL`
        public.ST_GeomFromGeoJSON(${geo}),
      `);
    } else {
      sqlStatement.append(SQL`
        public.ST_GeomFromGeoJSON(${geo})]))
      `);
    }
  });

  return sqlStatement;
}

/**
 * SQL query to insert a project permit row.
 *
 * @param permit_number
 * @param projectId
 * @param sampling_conducted
 * @returns {SQLStatement} sql query object
 */
export const postProjectPermitSQL = (
  permit_number: string,
  projectId: number,
  sampling_conducted: boolean
): SQLStatement | null => {
  defaultLog.debug({
    label: 'postProjectPermitSQL',
    message: 'params',
    permit_number,
    sampling_conducted,
    projectId
  });

  if (!permit_number || !projectId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
      INSERT INTO project_permit (
        p_id,
        number,
        sampling_conducted
      ) VALUES (
        ${projectId},
        ${permit_number},
        ${sampling_conducted}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postProjectPermitSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a project IUCN row.
 *
 * @param iucn3_id
 * @param project_id
 * @returns {SQLStatement} sql query object
 */
export const postProjectIUCNSQL = (iucn3_id: number, project_id: number): SQLStatement | null => {
  defaultLog.debug({
    label: 'postProjectIUCNSQL',
    message: 'params',
    iucn3_id,
    project_id
  });

  if (!iucn3_id || !project_id) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
      INSERT INTO project_iucn_action_classification (
        iucn3_id,
        p_id
      ) VALUES (
        ${iucn3_id},
        ${project_id}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postProjectIUCNSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a project activity row.
 *
 * @param activityId
 * @param projectId
 * @returns {SQLStatement} sql query object
 */
export const postProjectActivitySQL = (activityId: number, projectId: number): SQLStatement | null => {
  defaultLog.debug({
    label: 'postProjectActivity',
    message: 'params',
    activityId,
    projectId
  });

  if (!activityId || !projectId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
      INSERT INTO project_activity (
        a_id,
        p_id
      ) VALUES (
        ${activityId},
        ${projectId}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postProjectActivity',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};

/**
 * SQL query to insert a climate initiative row.
 *
 * @param climateChangeInitiativeId
 * @param projectId
 * @returns {SQLStatement} sql query object
 */
export const postProjectClimateChangeInitiativeSQL = (
  climateChangeInitiativeId: number,
  projectId: number
): SQLStatement | null => {
  defaultLog.debug({
    label: 'postProjectClimateChangeInitiativeSQL',
    message: 'params',
    climateChangeInitiativeId,
    projectId
  });

  if (!climateChangeInitiativeId || !projectId) {
    return null;
  }

  const sqlStatement: SQLStatement = SQL`
      INSERT INTO project_climate_initiative (
        cci_id,
        p_id
      ) VALUES (
        ${climateChangeInitiativeId},
        ${projectId}
      )
      RETURNING
        id;
    `;

  defaultLog.debug({
    label: 'postProjectClimateChangeInitiativeSQL',
    message: 'sql',
    'sqlStatement.text': sqlStatement.text,
    'sqlStatement.values': sqlStatement.values
  });

  return sqlStatement;
};