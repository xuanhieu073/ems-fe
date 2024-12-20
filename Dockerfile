# Sử dụng Nginx để phục vụ ứng dụng React
FROM nginx:latest

# Sao chép các file build vào thư mục HTML của Nginx
COPY dist/ems-fe/browser /usr/share/nginx/html

# Copy file cấu hình Nginx (tuỳ chọn nếu cần tuỳ chỉnh)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx khi container chạy
CMD ["nginx", "-g", "daemon off;"]
