<?php

namespace App\Services;

use App\Repositories\CompanyRepository;

class CompanyService
{

    protected $companyRepository, $emailService;
    public function __construct(CompanyRepository $companyRepository, EmailService $emailService)
    {
        $this->companyRepository = $companyRepository;
        $this->emailService = $emailService;
    }

    public function storeCompany($data, $fileName)
    {

        $data = [
            'id' => $data['edit_company_id'],
            'name' => $data['name'],
            'email' => $data['email'],
        ];
        $fileName ? $data['logo'] = $fileName : '';
        if (!isset($data['id'])) {
            $this->emailService->createCompanyNotification();
         }
        return $this->companyRepository->create($data);
    }

    public function companyRecords()
    {
        return $this->companyRepository->createdCompanyRecords();
    }

}
