<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use App\Models\Company;
use App\Services\EmployeeService;

class EmployeeController extends Controller
{
    protected $company, $employeeService;

    public function __construct(Company $company, EmployeeService $employeeService)
    {
        $this->company = $company;
        $this->employeeService = $employeeService;
    }

    public function index()
    {
        $companies = $this->company->get();
        $employees = $this->employeeService->employeeRecords();
        return view('layouts.employee.index', compact('companies', 'employees'));
    }


    public function store(EmployeeRequest $request)
    {
        $data = $request->all();
        return $this->employeeService->storeemployee($data);
    }


    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->back()->with('status', 'Record delete successfully');

    }
}
