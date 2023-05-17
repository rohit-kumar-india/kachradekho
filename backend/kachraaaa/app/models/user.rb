class User < ApplicationRecord
  has_secure_password
  has_many :products
  has_many :comments
  has_many :commented_products, through: :comments, source: :product
  has_many :likes
  has_many :liked_products, through: :likes, source: :product, conditions: { likes: { like_type: 'like' } }
  has_many :disliked_products, through: :likes, source: :product, conditions: { likes: { like_type: 'dislike' } }
  # mount_uploader :avatar, AvatarUploader
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
end