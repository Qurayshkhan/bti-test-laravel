<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use App\Services\CompanyService;

class CompanyController extends Controller
{
    protected $companyService, $emailService;

    public function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
    }

    public function create()
    {
        $companies = $this->companyService->companyRecords();
        return view('layouts.company.index', compact('companies'));
    }

    public function store(CompanyRequest $request)
    {
        $data = $request->all();

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $extention = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extention;
            $file->move('storage/uploads', $fileName);
        }

      return  $this->companyService->storeCompany($data, isset($fileName) ? $fileName : '');


    }


    public function destroy(Company $company)
    {

        $company->delete();
        return redirect()->back()->with('status', 'Record delete successfully');


    }
}
