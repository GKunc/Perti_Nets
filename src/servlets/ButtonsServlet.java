package servlets;

import org.jsoup.Jsoup;
import org.jsoup.helper.HttpConnection;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@WebServlet(name = "buttons", urlPatterns = "/buttons")
public class ButtonsServlet extends HttpServlet {
    public List<String> net = new LinkedList<>();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String button = request.getParameter("button");

        String fileName = "../../web/index.jsp";

        Document document = Jsoup.parse(new File(fileName), "utf-8");

        if (button.equals("start")) {
            System.out.println("Start");

        } else if (button.equals("pause")) {
            System.out.println("Pause");

        } else if (button.equals("stop")) {
            System.out.println("Stop");

        } else if (button.equals("square")) {
            this.net.add("square");
            System.out.println("Square");

        } else if (button.equals("circle")) {
            this.net.add("circle");
            System.out.println("Circle");

        } else if (button.equals("arrow")) {
            this.net.add("arrow");
            System.out.println("Arrow");
        }
        request.setAttribute("net", this.net);
        RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
        dispatcher.forward(request, response);
    }
}
