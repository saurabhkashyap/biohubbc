import * as occurrenceCreateModel from './occurrence-create';
import * as occurrenceViewModel from './occurrence-view';
import * as permitNoSamplingModel from './permit-no-sampling';
import * as projectCreateModel from './project-create';
import * as projectSurveyAttachmentsModel from './project-survey-attachments';
import * as projectUpdateModel from './project-update';
import * as projectViewModel from './project-view';
import * as projectViewUpdateModel from './project-view-update';
import * as publicProjectModel from './public/project';
import * as summaryResultsCreateModel from './summaryresults-create';
import * as surveyCreateModel from './survey-create';
import * as surveyUpdateModel from './survey-update';
import * as surveyViewModel from './survey-view';
import * as surveyViewUpdateModel from './survey-view-update';
import * as userModel from './user';

const ApiModels = () => {
  const project = {
    create: projectCreateModel,
    view: projectViewModel,
    viewUpdate: projectViewUpdateModel,
    update: projectUpdateModel
  };

  const attachments = {
    attachments: projectSurveyAttachmentsModel
  };

  const permits = {
    permits: permitNoSamplingModel
  };

  const user = {
    user: userModel
  };

  const survey = {
    create: surveyCreateModel,
    view: surveyViewModel,
    viewUpdate: surveyViewUpdateModel,
    update: surveyUpdateModel,
    summaryResults: summaryResultsCreateModel
  };

  const occurrence = {
    create: occurrenceCreateModel,
    view: occurrenceViewModel
  };

  const publicModels = {
    project: publicProjectModel
  };

  return {
    project,
    attachments,
    permits,
    user,
    survey,
    occurrence,
    public: publicModels
  };
};

export default ApiModels;
