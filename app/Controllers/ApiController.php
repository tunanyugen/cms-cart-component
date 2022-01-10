<?php
namespace Demo\Controllers;

class ApiController
{
    public function index(){
        return "API is working";
    }
    public function products(){
        return '{"items":[{"id":1,"entity_id":3,"name":"ARCTIC HUNTER High Quality Ultra-thin Hard Shell Men Fashion Backpack TSA Smart Lock 15.6 Inch Laptop Backpack Slim Travel Backpack","code":"Ultra-thin","price":750000,"in_stock":14,"banner":null,"activated":1,"created_at":"2022-01-09T07:25:23.000000Z","updated_at":"2022-01-09T07:25:23.000000Z","medias":[{"id":4,"gallery_id":1,"path":"https:\/\/my-live-05.slatic.net\/p\/2968b0ae729e7e2c68babf7e956439ca.jpg_2200x2200q80.jpg_.webp","activated":1,"created_at":"2022-01-09T08:12:07.000000Z","updated_at":"2022-01-09T08:12:07.000000Z"},{"id":3,"gallery_id":1,"path":"https:\/\/my-live-05.slatic.net\/p\/faeb6bf927baca732ee6f3a7eeeda841.jpg_2200x2200q80.jpg_.webp","activated":1,"created_at":"2022-01-09T08:12:07.000000Z","updated_at":"2022-01-09T08:12:07.000000Z"},{"id":2,"gallery_id":1,"path":"https:\/\/my-live-05.slatic.net\/p\/e6452c437718aa3f7cbcbacabd3e2fa4.jpg_2200x2200q80.jpg_.webp","activated":1,"created_at":"2022-01-09T08:12:07.000000Z","updated_at":"2022-01-09T08:12:07.000000Z"},{"id":1,"gallery_id":1,"path":"https:\/\/my-live-05.slatic.net\/p\/5acf757a9c51c66a1c4152257722c452.jpg_2200x2200q80.jpg_.webp","activated":1,"created_at":"2022-01-09T08:12:07.000000Z","updated_at":"2022-01-09T08:12:07.000000Z"}]}]}';
    }
}