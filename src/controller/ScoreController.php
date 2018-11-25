<?php
require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/ScoreDAO.php';

class ScoreController extends Controller{

  private $scoreDAO;

  function __construct(){
    $this->scoreDAO = new ScoreDAO();
  }
  public function index(){
    if(!empty($_POST['action'])){
      if($_POST['action'] == 'insertScore'){
        $this->handleInsertScore();
      }
    }
    $scores =$this->scoreDAO->selectAll();
    $this->set('scores',$scores);
    $this->set(`title`,'Score Overview');

    if(strtolower($_SERVER['HTTP_ACCEPT']) == 'application/json'){
      header('Content-Type: application/json');
      echo(json_encode($scores));
      exit();
    }
  }
  private function handleInsertScore(){
    $data = array(
      'date' => date('Y-m-d H:i:s'),
      'name1' => $_POST['name1'],
      'color1' => $_POST['color1'],
      'name2' => $_POST['name2'],
      'color2' => $_POST['color2'],
      'name3' => $_POST['name3'],
      'color3' => $_POST['color3'],
      'winner_name' => $_POST['winner_name'],
      'winner_color' => $_POST['winner_color']
    );
    $insertScoreResult = $this->scoreDAO->insert($data);
    if(!$insertScoreResult){
      $errors = $this->scoreDAO->validate($data);
      $this->set('errors',$errors);
      if(strtolower($_SERVER['HTTP_ACCEPT']) == 'application/json'){
        header('Content-Type: application/json');
        echo (json_encode(array('result'=> 'error', 'errors' => $errors)));
        exit();
      }
    }else{
      if(strtolower($_SERVER['HTTP_ACCEPT']) == 'application/json'){
        header('Content-Type: application/json');
        echo (json_encode(array('result'=> 'ok', 'score' => $insertScoreResult)));
        exit();
      }
    }
  }
}

?>
