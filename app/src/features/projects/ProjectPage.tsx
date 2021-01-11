import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import FormContainer from 'components/form/FormContainer';
import FormControlsComponent from 'components/form/FormControlsComponent';
import { projectTemplate } from 'constants/project-templates';
import { useBiohubApi } from 'hooks/useBioHubApi';
import { IProject } from 'interfaces/project-interfaces';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

/**
 * Page to display a single Project in view mode.
 *
 * @return {*}
 */
const ProjectPage: React.FC = () => {
  // const urlParams = useParams();

  const biohubApi = useBiohubApi();

  const [project, setProject] = useState(null);

  useEffect(() => {
    // This function is not fully flushed out or tested
    const getProject = async () => {
      // TODO disable for demo purposes

      // const projectResponse = await biohubApi.getProject(urlParams['id']);

      // if (!projectResponse) {
      //   // TODO error messaging
      //   return;
      // }

      // An example of an 'activity' which has top level fields, and a form_data object (which needs to match the template)
      const testProject: IProject = {
        id: 1,
        name: 'Project Name',
        objectives: 'Project Objectives',
        scientific_collection_permit_number: '123456',
        management_recovery_action: 'A',
        location_description: 'Location Description',
        start_date: moment().toISOString(),
        end_date: moment().toISOString(),
        results: 'Results',
        caveats: 'Caveats',
        comments: 'Comments'
      };

      setProject(testProject /*templateResponse*/);
    };

    if (!project) {
      getProject();
    }
  }, [biohubApi, project]);

  const handleChange = () => {};

  const handleSubmitSuccess = () => {};

  if (!project) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <Box my={3}>
      <Container>
        <Box mb={3}>
          <Typography variant="h2">{`Project ${project.id}`}</Typography>
        </Box>
        <Box>
          <FormContainer
            isDisabled={true}
            record={project}
            template={projectTemplate}
            formControlsComponent={<FormControlsComponent id={project.id} isDisabled={true} />}
            onFormChange={handleChange}
            onFormSubmitSuccess={handleSubmitSuccess}></FormContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectPage;