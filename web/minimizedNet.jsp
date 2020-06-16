<%--
  Created by IntelliJ IDEA.
  User: Grzegorz
  Date: 28/03/2020
  Time: 17:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Minimized Petri Net</title>

    <link href="./resources/css/index.css" rel="stylesheet" type="text/css">
    <link href="./resources/css/buttons.css" rel="stylesheet" type="text/css">
    <link href="./resources/css/shapes.css" rel="stylesheet" type="text/css">

    <script src="resources/scripts/globalVariables.js"></script>
    <script src="resources/scripts/addShapes.js"></script>
    <script src="resources/scripts/helpers.js"></script>
    <script src="resources/scripts/eventHandlers.js"></script>
    <script src="resources/scripts/netModel.js"></script>
    <script src="resources/scripts/simulationController.js"></script>
    <script src="resources/scripts/minimizeNet.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

</head>
<body>
<div class="board-container">
    <svg class="board" width="100%" height="100%">
        <defs>
            <marker id="arrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto">
                <path d="M2,1 L2,10 L10,6 L2,2" style="fill:black;" />
            </marker>
        </defs>
    </svg>
</div>
<script type="text/javascript">
    initMinimizedNet();
</script>
</body>
</html>
