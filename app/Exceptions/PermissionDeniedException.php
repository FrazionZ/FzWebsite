<?php

namespace App\Exceptions;
use Symfony\Component\Finder\Exception\AccessDeniedException;

class PermissionDeniedException extends AccessDeniedException
{
    /**
     * Create a new permission denied exception instance.
     *
     * @param string $permission
     */
    public function __construct($permission)
    {
    }

    public function render($request)
    {   
        return abort(403);
    }
}
