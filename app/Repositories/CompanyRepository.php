<?php

namespace App\Repositories;
use App\Models\Company;


class CompanyRepository{
    protected $company;

    public function __construct(Company $company){
        $this->company = $company;
    }

    public function create($data)
    {
      return  $this->company->updateOrCreate(
        ['id' => $data['id']],
        $data
    );

    }

    public function createdCompanyRecords()
    {
        return $this->company->get();
    }
}
