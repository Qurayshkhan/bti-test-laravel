<?php

namespace App\Services;

use App\Repositories\EmployeeRepository;

class EmployeeService
{

    protected $employeeRepository, $emailService;
    public function __construct(EmployeeRepository $employeeRepository, EmailService $emailService)
    {
        $this->employeeRepository = $employeeRepository;
        $this->emailService = $emailService;
    }

    public function storeemployee($data)
    {

        $data = [
            'id' => $data['edit_employee_id'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'company_id' => intval($data['company_id']),
        ];

       return $this->employeeRepository->create($data);

    }

    public function employeeRecords()
    {
        return $this->employeeRepository->createdemployeeRecords();
    }

}
