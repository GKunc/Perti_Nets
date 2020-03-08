package servlets;

import interfaces.IShapes;
import models.Arrow;
import models.Circle;
import models.Square;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@WebServlet(name = "buttons", urlPatterns = "/buttons")
public class ButtonsServlet extends HttpServlet {
    public List<IShapes> net_obejcts = new LinkedList<>();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String button = request.getParameter("button");
        request.getParameter("");

        String fileName = "../../web/index.jsp";

        Document document = Jsoup.parse(new File(fileName), "utf-8");

        if (button.equals("start")) {
            System.out.println("Start");

        } else if (button.equals("pause")) {
            System.out.println("Pause");

        } else if (button.equals("stop")) {
            System.out.println("Stop");

        } else if (button.equals("square")) {
            this.net_obejcts.add(new Square());

        } else if (button.equals("circle")) {
            this.net_obejcts.add(new Circle());

        } else if (button.equals("arrow")) {
            this.net_obejcts.add(new Arrow());
        }

        request.setAttribute("net", this.net_obejcts);
        RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
        dispatcher.forward(request, response);
    }
}
