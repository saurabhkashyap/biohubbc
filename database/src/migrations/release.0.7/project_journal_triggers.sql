 drop trigger if exists journal_activity on biohub.activity;
 drop trigger if exists journal_climate_change_initiative on biohub.climate_change_initiative;
 drop trigger if exists journal_first_nations on biohub.first_nations;
 drop trigger if exists journal_funding_source on biohub.funding_source;
 drop trigger if exists journal_iucn_conservation_action_level_1_classification on biohub.iucn_conservation_action_level_1_classification;
 drop trigger if exists journal_focal_species on biohub.focal_species;
 drop trigger if exists journal_project_activity on biohub.project_activity;
 drop trigger if exists journal_iucn_conservation_action_level_2_subclassification on biohub.iucn_conservation_action_level_2_subclassification;
 drop trigger if exists journal_iucn_conservation_action_level_3_subclassification on biohub.iucn_conservation_action_level_3_subclassification;
 drop trigger if exists journal_project_climate_initiative on biohub.project_climate_initiative;
 drop trigger if exists journal_project_first_nation on biohub.project_first_nation;
 drop trigger if exists journal_project_funding_source on biohub.project_funding_source;
 drop trigger if exists journal_project_iucn_action_classificaton on biohub.project_iucn_action_classificaton;
 drop trigger if exists journal_management_action_type on biohub.management_action_type;
 drop trigger if exists journal_no_sample_permit on biohub.no_sample_permit;
 drop trigger if exists journal_project_participation on biohub.project_participation;
 drop trigger if exists journal_system_user on biohub.system_user;
 drop trigger if exists journal_project_role on biohub.project_role;
 drop trigger if exists journal_project_region on biohub.project_region;
 drop trigger if exists journal_stakeholder_partnership on biohub.stakeholder_partnership;
 drop trigger if exists journal_system_user_role on biohub.system_user_role;
 drop trigger if exists journal_system_role on biohub.system_role;
 drop trigger if exists journal_project on biohub.project;
 drop trigger if exists journal_ancillary_species on biohub.ancillary_species;
 drop trigger if exists journal_investment_action_category on biohub.investment_action_category;
 drop trigger if exists journal_project_type on biohub.project_type;
 drop trigger if exists journal_project_management_actions on biohub.project_management_actions;
 drop trigger if exists journal_project_permit on biohub.project_permit;
 drop trigger if exists journal_user_identity_source on biohub.user_identity_source;

 create trigger journal_activity after insert or update or delete on biohub.activity for each row execute procedure tr_journal_trigger();
 create trigger journal_climate_change_initiative after insert or update or delete on biohub.climate_change_initiative for each row execute procedure tr_journal_trigger();
 create trigger journal_first_nations after insert or update or delete on biohub.first_nations for each row execute procedure tr_journal_trigger();
 create trigger journal_funding_source after insert or update or delete on biohub.funding_source for each row execute procedure tr_journal_trigger();
 create trigger journal_iucn_conservation_action_level_1_classification after insert or update or delete on biohub.iucn_conservation_action_level_1_classification for each row execute procedure tr_journal_trigger();
 create trigger journal_focal_species after insert or update or delete on biohub.focal_species for each row execute procedure tr_journal_trigger();
 create trigger journal_project_activity after insert or update or delete on biohub.project_activity for each row execute procedure tr_journal_trigger();
 create trigger journal_iucn_conservation_action_level_2_subclassification after insert or update or delete on biohub.iucn_conservation_action_level_2_subclassification for each row execute procedure tr_journal_trigger();
 create trigger journal_iucn_conservation_action_level_3_subclassification after insert or update or delete on biohub.iucn_conservation_action_level_3_subclassification for each row execute procedure tr_journal_trigger();
 create trigger journal_project_climate_initiative after insert or update or delete on biohub.project_climate_initiative for each row execute procedure tr_journal_trigger();
 create trigger journal_project_first_nation after insert or update or delete on biohub.project_first_nation for each row execute procedure tr_journal_trigger();
 create trigger journal_project_funding_source after insert or update or delete on biohub.project_funding_source for each row execute procedure tr_journal_trigger();
 create trigger journal_project_iucn_action_classificaton after insert or update or delete on biohub.project_iucn_action_classificaton for each row execute procedure tr_journal_trigger();
 create trigger journal_management_action_type after insert or update or delete on biohub.management_action_type for each row execute procedure tr_journal_trigger();
 create trigger journal_no_sample_permit after insert or update or delete on biohub.no_sample_permit for each row execute procedure tr_journal_trigger();
 create trigger journal_project_participation after insert or update or delete on biohub.project_participation for each row execute procedure tr_journal_trigger();
 create trigger journal_system_user after insert or update or delete on biohub.system_user for each row execute procedure tr_journal_trigger();
 create trigger journal_project_role after insert or update or delete on biohub.project_role for each row execute procedure tr_journal_trigger();
 create trigger journal_project_region after insert or update or delete on biohub.project_region for each row execute procedure tr_journal_trigger();
 create trigger journal_stakeholder_partnership after insert or update or delete on biohub.stakeholder_partnership for each row execute procedure tr_journal_trigger();
 create trigger journal_system_user_role after insert or update or delete on biohub.system_user_role for each row execute procedure tr_journal_trigger();
 create trigger journal_system_role after insert or update or delete on biohub.system_role for each row execute procedure tr_journal_trigger();
 create trigger journal_project after insert or update or delete on biohub.project for each row execute procedure tr_journal_trigger();
 create trigger journal_ancillary_species after insert or update or delete on biohub.ancillary_species for each row execute procedure tr_journal_trigger();
 create trigger journal_investment_action_category after insert or update or delete on biohub.investment_action_category for each row execute procedure tr_journal_trigger();
 create trigger journal_project_type after insert or update or delete on biohub.project_type for each row execute procedure tr_journal_trigger();
 create trigger journal_project_management_actions after insert or update or delete on biohub.project_management_actions for each row execute procedure tr_journal_trigger();
 create trigger journal_project_permit after insert or update or delete on biohub.project_permit for each row execute procedure tr_journal_trigger();
 create trigger journal_user_identity_source after insert or update or delete on biohub.user_identity_source for each row execute procedure tr_journal_trigger();
