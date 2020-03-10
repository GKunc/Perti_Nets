<%--
  Created by IntelliJ IDEA.
  User: Grzegorz
  Date: 06/03/2020
  Time: 15:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
  <head>
    <title>Petri Nets Creator</title>
    <link href="./resources/css/index.css" rel="stylesheet" type="text/css">
    <link href="./resources/css/buttons.css" rel="stylesheet" type="text/css">
    <link href="./resources/css/shapes.css" rel="stylesheet" type="text/css">

    <script src="resources/scripts/addShapes.js"></script>
    <script src="resources/scripts/helpers.js"></script>
    <script src="resources/scripts/eventHandlers.js"></script>
    <script src="resources/scripts/netModel.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

  </head>

  <body>
    <div class="button-container">
      <form action="/buttons" method="post">
        <button class="btn btn-start" name="button" value="start"></button>
        <button class="btn btn-pause" name="button" value="pause"></button>
        <button class="btn-stop" name="button" value="stop"></button>
      </form>
        <button class="btn-square" onclick="addSquare()" value="square"></button>
        <button class="btn-circle" onclick="addCircle()" value="circle"></button>
        <button class="btn-arrow" onclick="connect()" value="arrow"></button>
    </div>

    <div class="board-container">
      <svg class="board" width="100%" height="100%">
        <defs>
          <marker id="arrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto">
            <path d="M2,1 L2,10 L10,6 L2,2" style="fill:black;" />
          </marker>
        </defs>
      </svg>
    </div>
  </body>

  <script>
  </script>
</html>
