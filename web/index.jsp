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
    <title>Perti Nets Creator</title>
    <link href="./resources/css/index.css" rel="stylesheet" type="text/css">  </head>
  <body>

    <div class="button-container">
      <form action="/buttons" method="post">
        <button class="btn btn-start" name="button" value="start"></button>
        <button class="btn btn-pause" name="button" value="pause"></button>
        <button class="btn-stop" name="button" value="stop"></button>
        <button class="btn-square" name="button" value="square"></button>
        <button class="btn-circle" name="button" value="circle"></button>
        <button class="btn-arrow" name="button" value="arrow"></button>
      </form>
    </div>

    <div class="board-container" name="board">
      <c:forEach items="${net}" var="item">
        <h2>item</h2>
      </c:forEach>
    </div>
  </body>
</html>
