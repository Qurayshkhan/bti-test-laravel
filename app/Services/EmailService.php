<?php

namespace App\Services;
use App\Notifications\CompanyNotification;

class EmailService {

    public function createCompanyNotification()
    {
        $data = auth()->user();
        auth()->user()->notify(new CompanyNotification($data));

    }



}
