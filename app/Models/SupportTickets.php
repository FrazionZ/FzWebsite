<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTickets extends Model
{
    use HasFactory;

    protected $table = "support__tickets";

    protected $fillable = ['title', 'author', 'state', 'ch_id', 'problems', 'updated_at'];
}
