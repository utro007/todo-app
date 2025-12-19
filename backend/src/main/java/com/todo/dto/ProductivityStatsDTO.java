package com.todo.dto;

public class ProductivityStatsDTO {

    private double averageTaskDurationMinutes;
    private double completedPercentage;
    private long totalTasks;
    private long completedTasks;

    public ProductivityStatsDTO(
            double averageTaskDurationMinutes,
            double completedPercentage,
            long totalTasks,
            long completedTasks) {
        this.averageTaskDurationMinutes = averageTaskDurationMinutes;
        this.completedPercentage = completedPercentage;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
    }

    public double getAverageTaskDurationMinutes() {
        return averageTaskDurationMinutes;
    }

    public double getCompletedPercentage() {
        return completedPercentage;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }
}
