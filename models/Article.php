<?php

class Article
{
    public $id;
    public $title;
    public $annotation;
    public $author;
    public $text;
    public $image;
    public $created_at;


    /**
     * @return mixed
     */
    

    public static function getAllArticles($pagination, $page = 1)
    {
        $db = $GLOBALS['db'];
        $startRow = $pagination * $page - 3;
        $rowsCount = $pagination;
        return $db->getObjectsOf("SELECT articles.*, photos.link, authors.name FROM `articles` LEFT JOIN `photos` ON (articles.photo_id = photos.id) LEFT JOIN `authors` ON (articles.author_id = authors.id) LIMIT $startRow, $rowsCount", self::class);
    }

    public static function getArticlesWithAuthor($author, $pagination, $page = 1)
    {
        $db = $GLOBALS['db'];
        $startRow = $pagination * $page - 3;
        $rowsCount = $pagination;
        return $db->getObjectsOf("SELECT articles.*, photos.link, authors.name FROM `articles` LEFT JOIN `photos` ON (articles.photo_id = photos.id) LEFT JOIN `authors` ON (articles.author_id = authors.id) WHERE author_id = $author LIMIT $startRow, $rowsCount", self::class);
    }

    public static function getArticlesWithYear($year, $pagination, $page = 1)
    {
        $db = $GLOBALS['db'];
        $startRow = $pagination * $page - 3;
        $rowsCount = $pagination;
        return $db->getObjectsOf("SELECT articles.*, photos.link, authors.name FROM `articles` LEFT JOIN `photos` ON (articles.photo_id = photos.id) LEFT JOIN `authors` ON (articles.author_id = authors.id) WHERE YEAR(created_at) = $year  LIMIT $startRow, $rowsCount", self::class);
    }

    public static function getArticlesWithYearMonth($year, $month, $pagination, $page = 1)
    {
        $db = $GLOBALS['db'];
        $startRow = $pagination * $page - 3;
        $rowsCount = $pagination;
        return $db->getObjectsOf("SELECT articles.*, photos.link, authors.name FROM `articles` LEFT JOIN `photos` ON (articles.photo_id = photos.id) LEFT JOIN `authors` ON (articles.author_id = authors.id)  WHERE YEAR(created_at) = $year AND MONTH(created_at) = $month LIMIT $startRow, $rowsCount", self::class);
    }

    public static function getArticlesWithAuthorYear($author,$year, $pagination, $page = 1)
    {
        $db = $GLOBALS['db'];
        $startRow = $pagination * $page - 3;
        $rowsCount = $pagination;
        return $db->getObjectsOf("SELECT articles.*, photos.link, authors.name FROM `articles` LEFT JOIN `photos` ON (articles.photo_id = photos.id) LEFT JOIN `authors` ON (articles.author_id = authors.id) WHERE author_id = $author AND YEAR(created_at) = $year LIMIT $startRow, $rowsCount", self::class);
    }

    public static function getArticlesWithAuthorYearMonth($author,$year, $month, $pagination, $page = 1)
    {
        $db = $GLOBALS['db'];
        $startRow = $pagination * $page - 3;
        $rowsCount = $pagination;
        return $db->getObjectsOf("SELECT articles.*, photos.link, authors.name FROM `articles` LEFT JOIN `photos` ON (articles.photo_id = photos.id) LEFT JOIN `authors` ON (articles.author_id = authors.id) WHERE author_id = $author AND YEAR(created_at) = $year AND MONTH(created_at) = $month LIMIT $startRow, $rowsCount", self::class);
    }

    public static function getAllYears()
    {
        $db = $GLOBALS['db'];
        return $db->getObjectsOf("SELECT DISTINCT YEAR(`created_at`) FROM `articles` ORDER BY YEAR(created_at) DESC", self::class);
    }

    public static function getMonths($year)
    {
        $db = $GLOBALS['db'];
        return $db->getObjectsOf("SELECT DISTINCT MONTH(`created_at`) FROM `articles` WHERE YEAR(`created_at`) = $year ORDER BY MONTH(created_at)", self::class);
    }

    public static function getMonthsWithAuthor($year, $author)
    {
        $db = $GLOBALS['db'];
        return $db->getObjectsOf("SELECT DISTINCT MONTH(`created_at`) FROM `articles` WHERE YEAR(`created_at`) = $year AND `author_id` = $author ORDER BY MONTH(created_at)", self::class);
    }


    public static function getCount()
    {
        $db = $GLOBALS['db'];
        return intval($db->getOne('SELECT COUNT(*) FROM `articles`'));
    }

    public static function getCountWithAuthor($author)
    {
        $db = $GLOBALS['db'];
        return intval($db->getOne("SELECT COUNT(*) FROM `articles` WHERE author_id = $author"));
    }

    public static function getCountWithYear($year)
    {
        $db = $GLOBALS['db'];
        return intval($db->getOne("SELECT COUNT(*) FROM `articles` WHERE YEAR(created_at) = $year"));
    }

    public static function getCountWithYearMonth($year, $month)
    {
        $db = $GLOBALS['db'];
        return intval($db->getOne("SELECT COUNT(*) FROM `articles` WHERE YEAR(created_at) = $year AND MONTH(created_at) = $month"));
    }

    public static function getCountWithAuthorYear($author, $year)
    {
        $db = $GLOBALS['db'];
        return intval($db->getOne("SELECT COUNT(*) FROM `articles` WHERE author_id = $author AND YEAR(created_at) = $year"));
    }

    public static function getCountWithAuthorYearMonth($author, $year, $month)
    {
        $db = $GLOBALS['db'];
        return intval($db->getOne("SELECT COUNT(*) FROM `articles` WHERE author_id = $author AND YEAR(created_at) = $year AND MONTH(created_at) = $month"));
    }

}