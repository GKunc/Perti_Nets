package models;

import interfaces.IShapes;

public class Arrow implements IShapes {

    private String class_name;

    public String getClass_name() {
        return this.class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = "arrow";
    }

    public Arrow() {
        this.class_name = "arrow";
    }

    @Override
    public String draw() {
        return ("Arrow");
    }

    @Override
    public void move() {

    }

    public void connect() {

    }
}