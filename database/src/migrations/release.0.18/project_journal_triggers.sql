 create trigger journal_activity after insert or update or delete on biohub.activity for each row execute procedure tr_journal_trigger();
 create trigger journal_administrative_activity_type after insert or update or delete on biohub.administrative_activity_type for each row execute procedure tr_journal_trigger();
 create trigger journal_administrative_activity_status_type after insert or update or delete on biohub.administrative_activity_status_type for each row execute procedure tr_journal_trigger();
 create trigger journal_climate_change_initiative after insert or update or delete on biohub.climate_change_initiative for each row execute procedure tr_journal_trigger();
 create trigger journal_funding_source after insert or update or delete on biohub.funding_source for each row execute procedure tr_journal_trigger();
 create trigger journal_first_nations after insert or update or delete on biohub.first_nations for each row execute procedure tr_journal_trigger();
 create trigger journal_iucn_conservation_action_level_3_subclassification after insert or update or delete on biohub.iucn_conservation_action_level_3_subclassification for each row execute procedure tr_journal_trigger();
 create trigger journal_occurrence_submission after insert or update or delete on biohub.occurrence_submission for each row execute procedure tr_journal_trigger();
 create trigger journal_occurrence after insert or update or delete on biohub.occurrence for each row execute procedure tr_journal_trigger();
 create trigger journal_permit after insert or update or delete on biohub.permit for each row execute procedure tr_journal_trigger();
 create trigger journal_management_action_type after insert or update or delete on biohub.management_action_type for each row execute procedure tr_journal_trigger();
 create trigger journal_project_climate_initiative after insert or update or delete on biohub.project_climate_initiative for each row execute procedure tr_journal_trigger();
 create trigger journal_project_first_nation after insert or update or delete on biohub.project_first_nation for each row execute procedure tr_journal_trigger();
 create trigger journal_project_funding_source after insert or update or delete on biohub.project_funding_source for each row execute procedure tr_journal_trigger();
 create trigger journal_project_iucn_action_classification after insert or update or delete on biohub.project_iucn_action_classification for each row execute procedure tr_journal_trigger();
 create trigger journal_project_management_actions after insert or update or delete on biohub.project_management_actions for each row execute procedure tr_journal_trigger();
 create trigger journal_project_region after insert or update or delete on biohub.project_region for each row execute procedure tr_journal_trigger();
 create trigger journal_stakeholder_partnership after insert or update or delete on biohub.stakeholder_partnership for each row execute procedure tr_journal_trigger();
 create trigger journal_submission_status after insert or update or delete on biohub.submission_status for each row execute procedure tr_journal_trigger();
 create trigger journal_project_participation after insert or update or delete on biohub.project_participation for each row execute procedure tr_journal_trigger();
 create trigger journal_project_role after insert or update or delete on biohub.project_role for each row execute procedure tr_journal_trigger();
 create trigger journal_security after insert or update or delete on biohub.security for each row execute procedure tr_journal_trigger();
 create trigger journal_security_rule after insert or update or delete on biohub.security_rule for each row execute procedure tr_journal_trigger();
 create trigger journal_study_species after insert or update or delete on biohub.study_species for each row execute procedure tr_journal_trigger();
 create trigger journal_proprietor_type after insert or update or delete on biohub.proprietor_type for each row execute procedure tr_journal_trigger();
 create trigger journal_submission_status_type after insert or update or delete on biohub.submission_status_type for each row execute procedure tr_journal_trigger();
 create trigger journal_survey_funding_source after insert or update or delete on biohub.survey_funding_source for each row execute procedure tr_journal_trigger();
 create trigger journal_user_identity_source after insert or update or delete on biohub.user_identity_source for each row execute procedure tr_journal_trigger();
 create trigger journal_system_constant after insert or update or delete on biohub.system_constant for each row execute procedure tr_journal_trigger();
 create trigger journal_system_user_role after insert or update or delete on biohub.system_user_role for each row execute procedure tr_journal_trigger();
 create trigger journal_survey after insert or update or delete on biohub.survey for each row execute procedure tr_journal_trigger();
 create trigger journal_survey_attachment after insert or update or delete on biohub.survey_attachment for each row execute procedure tr_journal_trigger();
 create trigger journal_survey_proprietor after insert or update or delete on biohub.survey_proprietor for each row execute procedure tr_journal_trigger();
 create trigger journal_system_role after insert or update or delete on biohub.system_role for each row execute procedure tr_journal_trigger();
 create trigger journal_webform_draft after insert or update or delete on biohub.webform_draft for each row execute procedure tr_journal_trigger();
 create trigger journal_administrative_activity after insert or update or delete on biohub.administrative_activity for each row execute procedure tr_journal_trigger();
 create trigger journal_system_user after insert or update or delete on biohub.system_user for each row execute procedure tr_journal_trigger();
 create trigger journal_investment_action_category after insert or update or delete on biohub.investment_action_category for each row execute procedure tr_journal_trigger();
 create trigger journal_iucn_conservation_action_level_1_classification after insert or update or delete on biohub.iucn_conservation_action_level_1_classification for each row execute procedure tr_journal_trigger();
 create trigger journal_iucn_conservation_action_level_2_subclassification after insert or update or delete on biohub.iucn_conservation_action_level_2_subclassification for each row execute procedure tr_journal_trigger();
 create trigger journal_project after insert or update or delete on biohub.project for each row execute procedure tr_journal_trigger();
 create trigger journal_project_type after insert or update or delete on biohub.project_type for each row execute procedure tr_journal_trigger();
 create trigger journal_project_activity after insert or update or delete on biohub.project_activity for each row execute procedure tr_journal_trigger();
 create trigger journal_project_attachment after insert or update or delete on biohub.project_attachment for each row execute procedure tr_journal_trigger();
 create trigger journal_submission_message_type after insert or update or delete on biohub.submission_message_type for each row execute procedure tr_journal_trigger();
 create trigger journal_submission_message after insert or update or delete on biohub.submission_message for each row execute procedure tr_journal_trigger();
