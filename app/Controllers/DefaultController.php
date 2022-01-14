<?php
namespace Demo\Controllers;

use Jenssegers\Blade\Blade;

class DefaultController
{
	public function index()
	{
		$blade = new Blade([__DIR__.'/../../src', __DIR__.'/../../sample'], __DIR__.'/../../cache');

		echo $blade->make('index', ['greetings' => 'Hello World!'])->render();
	}
	public function cart()
	{
		$blade = new Blade([__DIR__.'/../../src', __DIR__.'/../../sample'], __DIR__.'/../../cache');

		echo $blade->make('Cart.index', [])->render();
	}
}