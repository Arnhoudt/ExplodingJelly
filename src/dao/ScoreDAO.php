<?php

require_once(__DIR__ . '/DAO.php');

class ScoreDAO extends DAO{

  public function selectAll(){
    $sql = "SELECT * FROM `scores` ORDER BY `date` DESC LIMIT 10";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  public function selectById($id){
    $sql = "SELECT * FROM `scores` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data){
    $errors = $this->validate($data);
    if(empty($errors)){
      $sql = "INSERT INTO `scores` (`date`,`name1`,`color1`,`name2`,`color2`,`name3`,`color3`,`winner_name`,`winner_color`) VALUES (:date, :name1, :color1, :name2, :color2, :name3, :color3, :winner_name, :winner_color)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':date', $data['date']);
      $stmt->bindValue(':name1', $data['name1']);
      $stmt->bindValue(':color1', $data['color1']);
      $stmt->bindValue(':name2', $data['name2']);
      $stmt->bindValue(':color2', $data['color2']);
      $stmt->bindValue(':name3', $data['name3']);
      $stmt->bindValue(':color3', $data['color3']);
      $stmt->bindValue(':winner_name', $data['winner_name']);
      $stmt->bindValue(':winner_color', $data['winner_color']);
      if($stmt->execute()){
        return $this->selectById($this->pdo->lastInsertId());
      }
    }
    return false;
  }
  public function validate($data){
    $errors = [];
    if(empty($data['name1'])){
      $errors['name1'] = 'Gelieve een name door te sturen';
    }
    return $errors;
  }

}


?>
