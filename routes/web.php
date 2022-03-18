<?php

use App\Models\Anagram;
use App\Models\MatchUp;
use App\Models\MemoryGame;
use App\Models\Quiz;
use App\Models\TrueOrFalse;
use App\Models\WordSearch;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Home Route
Route::get('/create', function () {
    return view('index');
});
// Game routes
Route::get('/wordsearch/{wordsearch}', function (WordSearch $wordsearch) {
    return view('index');
});
Route::get('/quiz/{quiz}', function (Quiz $quiz) {
    return view('index');
});
Route::get('/anagram/{anagram}', function (Anagram $anagram) {
    return view('index');
});
Route::get('/matchup/{matchup}', function (Matchup $matchup) {
    return view('index');
});
Route::get('/trueorfalse/{trueorfalse}', function (trueOrFalse $trueorfalse){
    return view('index');
});
Route::get('/memorygame/{memorygame}', function (MemoryGame $memorygame) {
    return view('index');
});
// Creation routes
Route::get('/create/quiz', function () {
    return view('index');
});
Route::get('/create/anagram', function () {
    return view('index');
});
Route::get('/create/wordsearch', function () {
    return view('index');
});
Route::get('/create/trueorfalse', function () {
    return view('index');
});
Route::get('/create/matchup', function () {
    return view('index');
});
Route::get('/create/memorygame', function () {
    return view('index');
});
// Edit routes
Route::get('/edit/anagram/{anagram}', function (Anagram $anagram) {
    return view('index');
});
Route::get('/edit/matchup/{matchup}', function (Matchup $matchup) {
    return view('index');
});
Route::get('/edit/memorygame/{memorygame}', function (Memorygame $memorygame) {
    return view('index');
});
Route::get('/edit/quiz/{quiz}', function (Quiz $quiz) {
    return view('index');
});
Route::get('/edit/trueorfalse/{trueorfalse}', function (TrueOrFalse $trueOrFalse) {
    return view('index');
});
Route::get('/edit/wordsearch/{wordsearch}', function (Wordsearch $wordsearch) {
    return view('index');
});
// Error routes
Route::get('/401', function () {
   return view('errors.401');
});
Route::get('/403', function () {
    return view('errors.403');
});
Route::get('/404', function () {
    return view('errors.404');
});
Route::get('/419', function () {
    return view('errors.419');
});
Route::get('/429', function () {
    return view('errors.429');
});
Route::get('/500', function () {
    return view('errors.500');
});
Route::get('/503', function () {
    return view('errors.503');
});
