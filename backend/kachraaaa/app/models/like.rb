class Like < ApplicationRecord
  belongs_to :user
  belongs_to :product

  after_create :create_notification

  def create_notification
    Notification.create(user: product.user, message: "#{user.username} likes your product: #{product.title}")
  end
end
