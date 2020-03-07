package models;

import interfaces.IShapes;

public class Square implements IShapes {

    private String class_name;

    public String getClass_name() {
        return this.class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }

    public Square() {
        this.class_name = "square";
    }
    @Override
    public String draw() {
        return ("Square");
    }

    @Override
    public void move() {

    }
}
