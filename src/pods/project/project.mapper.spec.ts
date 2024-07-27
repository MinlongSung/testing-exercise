import {
  mapEmployeeSummaryFromApiToVm,
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from './project.mapper';
import * as AM from './api/project.api-model';
import * as VM from './project.vm';

// Mock data
describe('mapEmployeeSummaryFromApiToVm', () => {
  it('should map API model to View one', () => {
    const rawEmployee: AM.EmployeeSummary = {
      id: '1',
      isAssigned: true,
      employeeName: 'John',
    };

    const expectedEmployee: VM.EmployeeSummary = {
      id: '1',
      isAssigned: true,
      employeeName: 'John',
    };

    const mapped = mapEmployeeSummaryFromApiToVm(rawEmployee);

    expect(mapped).toEqual(expectedEmployee);
  });

  it('should map API model to View one despite optional parameter missing', () => {
    const rawEmployee: AM.EmployeeSummary = {
      id: '1',
      employeeName: 'John',
    };

    const expectedEmployee: VM.EmployeeSummary = {
      id: '1',
      isAssigned: undefined,
      employeeName: 'John',
    };

    const mapped = mapEmployeeSummaryFromApiToVm(rawEmployee);

    expect(mapped).toEqual(expectedEmployee);
  });
});

describe('mapEmployeeSummaryListFromApiToVm', () => {
  it('should map the API Model list to View one', () => {
    const rawEmployees: AM.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John',
      },
      {
        id: '2',
        isAssigned: false,
        employeeName: 'Laura',
      },
    ];

    const expectedEmployees: VM.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John',
      },
      {
        id: '2',
        isAssigned: false,
        employeeName: 'Laura',
      },
    ];

    const mapped = mapEmployeeSummaryListFromApiToVm(rawEmployees);

    expect(mapped).toEqual(expectedEmployees);
  });
});

describe('mapProjectFromApiToVm', () => {
  it('should map API model to View one', () => {
    const rawEmployees: AM.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John',
      },
      {
        id: '2',
        isAssigned: false,
        employeeName: 'Laura',
      },
    ];

    const rawProject: AM.Project = {
      id: '1',
      name: 'MapperTest',
      externalId: '2',
      comments: 'Working fine',
      isActive: true,
      employees: rawEmployees,
    };

    const expectedEmployees: VM.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John',
      },

      {
        id: '2',
        isAssigned: false,
        employeeName: 'Laura',
      },
    ];

    const expectedProject: VM.Project = {
      id: '1',
      name: 'MapperTest',
      externalId: '2',
      comments: 'Working fine',
      isActive: true,
      employees: expectedEmployees,
    };

    const mapped = mapProjectFromApiToVm(rawProject);

    expect(mapped).toEqual(expectedProject);
  });

  it('should map the raw project even when optional properties missing', () => {
    const rawEmployees: AM.EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'John',
      },
      {
        id: '2',
        isAssigned: false,
        employeeName: 'Laura',
      },
    ];

    const rawProject: AM.Project = {
      id: '1',
      name: 'MapperTest',
      isActive: true,
      employees: rawEmployees,
    };

    const expectedEmployees: VM.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: undefined,
        employeeName: 'John',
      },

      {
        id: '2',
        isAssigned: false,
        employeeName: 'Laura',
      },
    ];

    const expectedProject: VM.Project = {
      id: '1',
      name: 'MapperTest',
      externalId: undefined,
      comments: undefined,
      isActive: true,
      employees: expectedEmployees,
    };

    const mapped = mapProjectFromApiToVm(rawProject);

    expect(mapped).toEqual(expectedProject);
  });

  it('should return default project if project is nullish', () => {
    const expectedProject = VM.createEmptyProject();

    const mapped1 = mapProjectFromApiToVm(null);
    const mapped2 = mapProjectFromApiToVm(undefined);

    expect(mapped1).toEqual(expectedProject);
    expect(mapped2).toEqual(expectedProject);
  });
});
