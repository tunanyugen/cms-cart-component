<?php
/**
 * This file contains all the routes for the project
 */

use Demo\Router;

Router::csrfVerifier(new \Demo\Middlewares\CsrfVerifier());

Router::setDefaultNamespace('\Demo\Controllers');

Router::group(['exceptionHandler' => \Demo\Handlers\CustomExceptionHandler::class], function () {

	Router::get('/', 'DefaultController@index')->setName('index');

    // API

	Router::group(['prefix' => '/api', 'middleware' => \Demo\Middlewares\ApiVerification::class], function () {
        Router::get('/', 'ApiController@index')->setName('api.index');
        Router::get('/products', 'ApiController@products')->setName('api.products');
	});

});