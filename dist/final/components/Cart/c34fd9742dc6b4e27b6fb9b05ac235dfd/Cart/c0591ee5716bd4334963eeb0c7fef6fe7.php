<?php

namespace Components\Cart\c34fd9742dc6b4e27b6fb9b05ac235dfd\Cart;

use App\Utilities\ExtendedComponent;

class c0591ee5716bd4334963eeb0c7fef6fe7 extends ExtendedComponent
{
    protected string $uuid = "c0591ee5716bd4334963eeb0c7fef6fe7";
    protected string $group_id = "c34fd9742dc6b4e27b6fb9b05ac235dfd";
    protected string $type = "Cart";
    protected string $name = "Cart";
    protected string $description = "Cart section";
    // variables used in pug template
    protected array $variables = [
        
    ];
    // define which type of input each variable uses
    // AVAILABLE TYPES
    // ckeditor: for writing articles, large content
    // checkbox: for toggling on/off
    // input: for writing name, title, small content
    // media-input: for inserting images/iframes
    // multi-media-input: for inserting multiple images/iframes
    // select: for selecting content from a dropdown list
    // sortable: for a draggable sorting input
    // tag-input: for selecting multiple tags
    // textarea: for writing notes
    protected array $input_types = [
        
    ];
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view("$this->type.$this->group_id.$this->name.$this->uuid");
    }
}