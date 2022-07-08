class CouponController < ApplicationController
    def admin_coupon
        @coupons = Coupon.all
    end
end
