<?php

namespace App\Repositories;
use App\Models\Employee;


class EmployeeRepository{
    protected $employee;

    public function __construct(Employee $employee){
        $this->employee = $employee;
    }

    public function create($data)
    {
      return  $this->employee->updateOrCreate(
        ['id' => $data['id']],
        $data
    );

    }

    public function createdemployeeRecords()
    {
       return $this->employee->with('company')->get();

    }
}
