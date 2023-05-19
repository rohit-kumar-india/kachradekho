class LikesController < ApplicationController
  before_action :authorize_request

  def create
    @like = current_user.likes.build(like_params)
    if @like.save
      create_notification(@like.product.user, current_user, @like.product)
      render json: { status: :created, message: 'Like created successfully' }
    else
      render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @like = Like.find_by(user_id: current_user.id, product_id: params[:product_id])
    if @like.update(like_params)
      render json: { status: :ok, message: 'Like updated successfully' }
    else
      render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @like = Like.find_by(user_id: current_user.id, product_id: params[:product_id])
    @like.destroy
    render json: { status: :ok, message: 'Like destroyed successfully' }
  end

  private

  def like_params
    params.permit(:product_id, :like_type)
  end

  def create_notification(user, liked_by_user, product)
    Notification.create(user: user, message: "#{liked_by_user.username} likes your product: #{product.title}")
  end
end
