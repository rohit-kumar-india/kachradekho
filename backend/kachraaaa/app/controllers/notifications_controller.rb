class NotificationsController < ApplicationController
  before_action :authorize_request

  def index
    @notifications = @current_user.notifications
    render json: @notifications, status: :ok
  end

  def mark_as_read
    @notification = @current_user.notifications.find(params[:id])
    @notification.update(read: true)
    render json: { message: 'Notification marked as read' }, status: :ok
  end

  def destroy
    @notification = @current_user.notifications.find(params[:id])
    @notification.destroy
    render json: { message: 'Notification deleted' }, status: :ok
  end
end
