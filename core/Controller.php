<?php

include_once __DIR__ . '/DB.php';
include_once __DIR__ . '/../models/Article.php';
include_once __DIR__ . '/../models/Author.php';

class Controller
{
    private $db;

    function __construct()
    {
        $this->db = isset($GLOBALS['db'])
            ? $GLOBALS['db']
            : new DB(include __DIR__ . '/../config.php');
    }

    public function actionIndex()
    {
        // $data = Article::getAll();
        require __DIR__ . '/../view/index.view.php';

    }

    /**
     * @param Array $request
     */
    public function actionFiltration($request,$pagination)
    {
        $data = [];

        if(isset($request['init']))
        {
            $authors = Author::getAll();
            $data['authors'] = $authors;
            $articles = Article::getAllArticles($pagination);
            $data['articles'] = $articles;
            $years = Article::getAllYears();
            //вытаскиваем год из объекта и пишем в массив
            $temp = [];
            foreach ($years as $year) {
                foreach ($year as $item) {
                    if((int)$item != null)
                    {
                        array_push($temp, $item);
                    }
                }
            }
            $data['years'] = $temp;
            $articlesCount = Article::getCount();
            $data['articlesCount'] = $articlesCount;
            $data['articlesOnPage'] = $pagination;
        }
        

        else if ($request['authorID'] == -999 && $request['year'] == -9999)
        {
            $articles = Article::getAllArticles($pagination, $request['page']);
            $data['articles'] = $articles;
            $articlesCount = Article::getCount();
            $data['articlesCount'] = $articlesCount;
            $data['articlesOnPage'] = $pagination;
        }

        else if($request['authorID'] != -999 && $request['year'] == -9999)
        {
            $articles = Article::getArticlesWithAuthor($request['authorID'], $pagination, $request['page']);
            $data['articles'] = $articles;
            $articlesCount = Article::getCountWithAuthor($request['authorID']);
            $data['articlesCount'] = $articlesCount;
            $data['articlesOnPage'] = $pagination;
        }

        else if($request['authorID'] == -999 && $request['year'] != -9999 && $request['month'] != null)
        {
            $articles = Article::getArticlesWithYearMonth($request['year'], $request['month'], $pagination, $request['page']);
            $data['articles'] = $articles;
            $articlesCount = Article::getCountWithYearMonth($request['year'], $request['month']);
            $data['articlesCount'] = $articlesCount;
            $data['articlesOnPage'] = $pagination;
        }

        else if($request['authorID'] == -999 && $request['year'] != -9999)
        {
            $articles = Article::getArticlesWithYear($request['year'], $pagination, $request['page']);
            $data['articles'] = $articles;
            //вытаскиваем месяц из объекта и пишем в массив
            $months = Article::getMonths($request['year']);
            $temp = [];
            foreach ($months as $month) {
                foreach ($month as $item) {
                    if((int)$item != null)
                    {
                        array_push($temp, $item);
                    }
                }
            }
            
            $data['months'] = $temp;
            $articlesCount = Article::getCountWithYear($request['year']);
            $data['articlesCount'] = $articlesCount;
            $data['articlesOnPage'] = $pagination;
        }


        else if($request['authorID'] != -999 && $request['year'] != -9999 && $request['month'] != null)
        {
            $articles = Article::getArticlesWithAuthorYearMonth($request['authorID'], $request['year'], $request['month'], $pagination, $request['page']);
            $data['articles'] = $articles;
            $articlesCount = Article::getCountWithAuthorYearMonth($request['authorID'], $request['year'], $request['month']);
            $data['articlesCount'] = $articlesCount;
            $data['articlesOnPage'] = $pagination;
        }

        else if($request['authorID'] != -999 && $request['year'] != -9999)
        {
            $articles = Article::getArticlesWithAuthorYear($request['authorID'], $request['year'], $pagination, $request['page']);
            $data['articles'] = $articles;
            $months = Article::getMonthsWithAuthor($request['year'], $request['authorID']);
            $temp = [];
            foreach ($months as $month) {
                foreach ($month as $item) {
                    if((int)$item != null)
                    {
                        array_push($temp, $item);
                    }
                }
            }
            
            $data['months'] = $temp;
            $articlesCount = Article::getCountWithAuthorYear($request['authorID'], $request['year']);
            $data['articlesCount'] = $articlesCount;
            $data['articlesOnPage'] = $pagination;
        }

        

        echo json_encode($data);
    }
}