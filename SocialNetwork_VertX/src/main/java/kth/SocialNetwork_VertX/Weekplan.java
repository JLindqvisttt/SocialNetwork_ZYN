package kth.SocialNetwork_VertX;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Weekplan {

  @Id
  @GeneratedValue
  private int id;
  private String userEmail;
  private String currentTime;
  private int monday;
  private int tuesday;
  private int wednesday;
  private int thursday;
  private int friday;
  private int saturday;
  private int sunday;

  private String chart;



//@ElementCollection
  //private List<DayPlan> weekPlanList;

  public Weekplan(String userEmail, String currentTime, int monday, int tuesday, int wednesday, int thursday, int friday, int saturday, int sunday, String chart) {
    this.id = id;
    this.userEmail = userEmail;
    this.currentTime = currentTime;
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
    this.chart = chart;
  }
  public Weekplan(int id, String userEmail, String currentTime, int monday, int tuesday, int wednesday, int thursday, int friday, int saturday, int sunday, String chart) {
    this.id = id;
    this.userEmail = userEmail;
    this.currentTime = currentTime;
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
    this.chart = chart;
  }

  public Weekplan() {
  }

  public String getChart() {
    return chart;
  }

  public void setChart(String chart) {
    this.chart = chart;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUserEmail() {
    return userEmail;
  }

  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  public String getCurrentTime() {
    return currentTime;
  }

  public void setCurrentTime(String currentTime) {
    this.currentTime = currentTime;
  }

  public int getMonday() {
    return monday;
  }

  public void setMonday(int monday) {
    this.monday = monday;
  }


  public int getWednesday() {
    return wednesday;
  }

  public void setWednesday(int wednesday) {
    this.wednesday = wednesday;
  }

  public int getThursday() {
    return thursday;
  }

  public void setThursday(int thursday) {
    this.thursday = thursday;
  }

  public int getFriday() {
    return friday;
  }

  public void setFriday(int friday) {
    this.friday = friday;
  }

  public int getSaturday() {
    return saturday;
  }

  public void setSaturday(int saturday) {
    this.saturday = saturday;
  }

  public int getTuesday() {
    return tuesday;
  }

  public void setTuesday(int tuesday) {
    this.tuesday = tuesday;
  }

  public int getSunday() {
    return sunday;
  }

  public void setSunday(int sunday) {
    this.sunday = sunday;
  }


}
