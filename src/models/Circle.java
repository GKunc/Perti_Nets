package models;

import interfaces.IShapes;

public class Circle implements IShapes {

    private String class_name;

    public String getClass_name() {
        return this.class_name;
    }

    public void setClass_name() {
        this.class_name = class_name;
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
