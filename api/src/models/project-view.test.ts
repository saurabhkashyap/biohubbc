import { expect } from 'chai';
import { describe } from 'mocha';
import {
  GetCoordinatorData,
  GetFundingData,
  GetIUCNClassificationData,
  GetObjectivesData,
  GetPartnershipsData,
  GetSpeciesData
} from './project-view';

describe('GetSpeciesData', () => {
  describe('No values provided', () => {
    let data: GetSpeciesData;

    before(() => {
      data = new GetSpeciesData((null as unknown) as any[], []);
    });

    it('sets focal_species', function () {
      expect(data.focal_species).to.eql([]);
    });

    it('sets ancillary_species', function () {
      expect(data.ancillary_species).to.eql([]);
    });
  });

  describe('focal species values provided', () => {
    let data: GetSpeciesData;

    const focal_species = [{ name: 'species 1' }, { name: 'species 2' }];
    const ancillary_species: any[] = [];

    before(() => {
      data = new GetSpeciesData(focal_species, ancillary_species);
    });

    it('sets focal_species', function () {
      expect(data.focal_species).to.eql(['species 1', 'species 2']);
    });

    it('sets ancillary_species', function () {
      expect(data.ancillary_species).to.eql([]);
    });
  });

  describe('ancillary species values provided', () => {
    let data: GetSpeciesData;

    const focal_species = (null as unknown) as any[];
    const ancillary_species = [{ name: 'species 3' }, { name: 'species 4' }];

    before(() => {
      data = new GetSpeciesData(focal_species, ancillary_species);
    });

    it('sets focal_species', function () {
      expect(data.focal_species).to.eql([]);
    });

    it('sets ancillary_species', function () {
      expect(data.ancillary_species).to.eql(['species 3', 'species 4']);
    });
  });

  describe('All values provided', () => {
    let data: GetSpeciesData;

    const focal_species = [{ name: 'species 1' }, { name: 'species 2' }];
    const ancillary_species = [{ name: 'species 3' }];

    before(() => {
      data = new GetSpeciesData(focal_species, ancillary_species);
    });

    it('sets focal_species', function () {
      expect(data.focal_species).to.eql(['species 1', 'species 2']);
    });

    it('sets ancillary_species', function () {
      expect(data.ancillary_species).to.eql(['species 3']);
    });
  });
});

describe('GetPartnershipsData', () => {
  describe('No values provided', () => {
    let data: GetPartnershipsData;

    before(() => {
      data = new GetPartnershipsData([], []);
    });

    it('sets indigenous_partnerships', function () {
      expect(data.indigenous_partnerships).to.eql([]);
    });

    it('sets stakeholder_partnerships', function () {
      expect(data.stakeholder_partnerships).to.eql([]);
    });
  });

  describe('indigenous_partnerships values provided', () => {
    let data: GetPartnershipsData;

    const indigenous_partnerships = [{ name: 'partner 1' }, { name: 'partner 2' }];
    const stakeholder_partnerships: string[] = [];

    before(() => {
      data = new GetPartnershipsData(indigenous_partnerships, stakeholder_partnerships);
    });

    it('sets indigenous_partnerships', function () {
      expect(data.indigenous_partnerships).to.eql(['partner 1', 'partner 2']);
    });

    it('sets stakeholder_partnerships', function () {
      expect(data.stakeholder_partnerships).to.eql([]);
    });
  });

  describe('stakeholder_partnerships values provided', () => {
    let data: GetPartnershipsData;

    const indigenous_partnerships: string[] = [];
    const stakeholder_partnerships = [{ name: 'partner 1' }, { name: 'partner 2' }];

    before(() => {
      data = new GetPartnershipsData(indigenous_partnerships, stakeholder_partnerships);
    });

    it('sets indigenous_partnerships', function () {
      expect(data.indigenous_partnerships).to.eql([]);
    });

    it('sets stakeholder_partnerships', function () {
      expect(data.stakeholder_partnerships).to.eql(['partner 1', 'partner 2']);
    });
  });

  describe('All values provided', () => {
    let data: GetPartnershipsData;

    const indigenous_partnerships = [{ name: 'partner 1' }, { name: 'partner 2' }];
    const stakeholder_partnerships = [{ name: 'partner 3' }, { name: 'partner 4' }];

    before(() => {
      data = new GetPartnershipsData(indigenous_partnerships, stakeholder_partnerships);
    });

    it('sets indigenous_partnerships', function () {
      expect(data.indigenous_partnerships).to.eql(['partner 1', 'partner 2']);
    });

    it('sets stakeholder_partnerships', function () {
      expect(data.stakeholder_partnerships).to.eql(['partner 3', 'partner 4']);
    });
  });
});

describe('GetIUCNClassificationData', () => {
  describe('No values provided', () => {
    let iucnClassificationData: GetIUCNClassificationData;

    before(() => {
      iucnClassificationData = new GetIUCNClassificationData([]);
    });

    it('sets classification details', function () {
      expect(iucnClassificationData.classificationDetails).to.eql([]);
    });
  });

  describe('All values provided', () => {
    let iucnClassificationData: GetIUCNClassificationData;

    const iucnClassificationDataObj = [
      {
        classification: 'class',
        subclassification1: 'subclass1',
        subclassification2: 'subclass2'
      }
    ];

    before(() => {
      iucnClassificationData = new GetIUCNClassificationData(iucnClassificationDataObj);
    });

    it('sets classification details', function () {
      expect(iucnClassificationData.classificationDetails).to.eql([
        {
          classification: 'class',
          subClassification1: 'subclass1',
          subClassification2: 'subclass2'
        }
      ]);
    });
  });
});

describe('GetFundingData', () => {
  describe('No values provided', () => {
    let fundingData: GetFundingData;

    before(() => {
      fundingData = new GetFundingData([]);
    });

    it('sets funding agencies', function () {
      expect(fundingData.fundingAgencies).to.eql([]);
    });
  });

  describe('All values provided', () => {
    let fundingData: GetFundingData;

    const fundingDataObj = [
      {
        agency_id: '123',
        agency_name: 'Agency name',
        investment_action_category: 'investment',
        start_date: '01/01/2020',
        end_date: '01/01/2021',
        funding_amount: 123
      }
    ];

    before(() => {
      fundingData = new GetFundingData(fundingDataObj);
    });

    it('sets funding agencies', function () {
      expect(fundingData.fundingAgencies).to.eql(fundingDataObj);
    });
  });
});

describe('GetObjectivesData', () => {
  describe('No values provided', () => {
    let projectObjectivesData: GetObjectivesData;

    before(() => {
      projectObjectivesData = new GetObjectivesData(null);
    });

    it('sets objectives', function () {
      expect(projectObjectivesData.objectives).to.equal('');
    });

    it('sets caveats', function () {
      expect(projectObjectivesData.caveats).to.equal('');
    });
  });

  describe('All values provided', () => {
    let projectObjectivesData: GetObjectivesData;

    const obj = {
      objectives: 'these are the project objectives',
      caveats: 'these are some interesting caveats'
    };

    before(() => {
      projectObjectivesData = new GetObjectivesData(obj);
    });

    it('sets objectives', function () {
      expect(projectObjectivesData.objectives).to.equal(obj.objectives);
    });

    it('sets caveats', function () {
      expect(projectObjectivesData.caveats).to.equal(obj.caveats);
    });
  });
});

describe('GetCoordinatorData', () => {
  describe('No values provided', () => {
    let projectCoordinatorData: GetCoordinatorData;

    before(() => {
      projectCoordinatorData = new GetCoordinatorData(null);
    });

    it('sets first_name', function () {
      expect(projectCoordinatorData.first_name).to.equal('');
    });

    it('sets last_name', function () {
      expect(projectCoordinatorData.last_name).to.equal('');
    });

    it('sets email_address', function () {
      expect(projectCoordinatorData.email_address).to.equal('');
    });

    it('sets coordinator_agency', function () {
      expect(projectCoordinatorData.coordinator_agency).to.equal('');
    });

    it('sets share_contact_details', function () {
      expect(projectCoordinatorData.share_contact_details).to.equal('false');
    });
  });

  describe('All values provided', () => {
    let projectCoordinatorData: GetCoordinatorData;

    const obj = {
      coordinator_first_name: 'first',
      coordinator_last_name: 'last',
      coordinator_email_address: 'email@example.com',
      coordinator_agency_name: 'agency',
      coordinator_public: true
    };

    before(() => {
      projectCoordinatorData = new GetCoordinatorData(obj);
    });

    it('sets first_name', function () {
      expect(projectCoordinatorData.first_name).to.equal(obj.coordinator_first_name);
    });

    it('sets last_name', function () {
      expect(projectCoordinatorData.last_name).to.equal(obj.coordinator_last_name);
    });

    it('sets email_address', function () {
      expect(projectCoordinatorData.email_address).to.equal(obj.coordinator_email_address);
    });

    it('sets coordinator_agency', function () {
      expect(projectCoordinatorData.coordinator_agency).to.equal(obj.coordinator_agency_name);
    });

    it('sets share_contact_details', function () {
      expect(projectCoordinatorData.share_contact_details).to.equal('true');
    });
  });
});