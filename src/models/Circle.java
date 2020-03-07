package models;

import interfaces.IShapes;

public class Circle implements IShapes {

    private String class_name;
    private double x_position, y_position;
    private double width, height;

    public String getClass_name() {
        return this.class_name;
    }
    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }

    public double getX_position() {
        return this.x_position;
    }
    public void setX_position(double x_position) { this.x_position = x_position; }

    public double getY_position() {
        return this.y_position;
    }
    public void setY_position(double y_position) {
        this.y_position = y_position;
    }

    public double getWidth() {
        return this.width;
    }
    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return this.height;
    }
    public void setHeight(double height) {
        this.height = height;
    }

    public Circle() {
        this.class_name = "circle";
    }
    @Override
    public String draw() {
        return ("Circle");
    }

    @Override
    public void move() {

    }
}
