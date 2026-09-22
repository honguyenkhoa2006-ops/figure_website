document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const rootElement = document.documentElement; // Lấy thẻ html

    // Đồng bộ trạng thái icon khi load trang dựa vào localStorage
    if (localStorage.getItem('theme') === 'light') {
        if (themeIcon) {
            themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        }
    }

    // Sự kiện bấm nút đổi màu
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            rootElement.classList.toggle('light-mode');
            
            if (rootElement.classList.contains('light-mode')) {
                if (themeIcon) {
                    themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
                }
                localStorage.setItem('theme', 'light');
            } else {
                if (themeIcon) {
                    themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
                }
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- 2. XỬ LÝ MENU DROPDOWN TÀI KHOẢN ---
    const accountBtn = document.getElementById('account-btn');
    const dropdownBox = document.getElementById('dropdown-box');

    if (accountBtn && dropdownBox) {
        // Bấm vào nút Tài khoản để bật/tắt menu Dropdown
        accountBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
            dropdownBox.classList.toggle('show');
        });

        // Click ra vùng bất kỳ bên ngoài thì tự động ẩn menu đi
        window.addEventListener('click', () => {
            if (dropdownBox.classList.contains('show')) {
                dropdownBox.classList.remove('show');
            }
        });

        // Ngăn không cho click bên trong hộp dropdown làm ẩn hộp
        dropdownBox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // --- XỬ LÝ CHUYỂN ĐỔI NỘI DUNG TRANG TUTORIAL ---
    const tutorialLinks = document.querySelectorAll('.tutorial-link');
    
    // Kho dữ liệu nội dung cho từng bài tutorial (Bạn có thể sửa lại link youtube & chữ tùy ý)
    const tutorialData = {
        'tutor-1': {
            title: '1. Dụng cụ cơ bản cần có cho người mới nhập môn Model Kit',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            notes: `
                <li><strong>Kìm cắt chuyên dụng (Nipper):</strong> Nên chọn loại kìm có lưỡi phẳng để cắt part khỏi runner.</li>
                <li><strong>Dao trổ (Hobby Knife):</strong> Dùng để gọt sạch phần nhựa thừa còn sót lại.</li>
                <li><strong>Giấy nhám / Thanh mài:</strong> Sử dụng các mức từ #800 đến #2000 để chà nhám mịn bề mặt.</li>
                <li><strong>Lưu ý an toàn:</strong> Dụng cụ sắc bén, cẩn thận khi thao tác.</li>
            `
        },
        'tutor-2': {
            title: '2. Kỹ thuật cắt chi tiết (Gate Cutting Standard)',
            video: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', // Thay link khác nếu muốn
            notes: `
                <li><strong>Cắt 2 bước (Two-step cutting):</strong> Không cắt sát vào part ngay lập tức. Lần 1 cắt cách part 1-2mm, lần 2 dùng kìm phẳng gọt bỏ phần dư.</li>
                <li><strong>Tránh ngấn trắng (Stress mark):</strong> Cắt quá sát sẽ làm nhựa bị lực ép trắng ra, khó xử lý về sau.</li>
                <li><strong>Dùng dao gọt phẳng:</strong> Xử lý phần chân cổng thừa bằng lưỡi dao trổ nghiêng 45 độ.</li>
            `
        },
        'tutor-3': {
            title: '3. Kỹ thuật lắp ghép & Xử lý khớp nối (Assembly & Joints)',
            video: 'https://www.youtube.com/embed/L_LUpnjgPso',
            notes: `
                <li><strong>Đọc kỹ sách hướng dẫn (Manual):</strong> Kiểm tra kỹ thứ tự các bước lắp ráp để tránh việc lắp nhầm phải tháo ra rất dễ gãy chốt.</li>
                <li><strong>Khớp lỏng / Khớp cứng:</strong> Nếu khớp quá lỏng có thể bôi một lớp keo dán mỏng để tạo độ rít, không ép lực quá mạnh khi ráp.</li>
            `
        },
        'tutor-4': {
            title: '4. Kỹ thuật dán Decal & Water Slide Decal chuyên nghiệp',
            video: 'https://www.youtube.com/embed/9bZkp7q19f0',
            notes: `
                <li><strong>Decal dán thường (Sticker):</strong> Dùng nhíp gắp nhẹ nhàng, căn chỉnh chuẩn vị trí rồi ấn chặt.</li>
                <li><strong>Water Slide Decal (Decal nước):</strong> Ngâm nước ấm 10-15 giây, trượt decal ra khỏi giấy rồi dùng tăm bông thấm bớt nước trên bề mặt mô hình.</li>
                <li><strong>Dung dịch làm mềm decal (Mark Softer):</strong> Giúp decal bám chặt vào các đường rãnh panel line.</li>
            `
        },
        'tutor-5': {
            title: '5. Hoàn thiện chi tiết & Phủ bóng bảo vệ (Topcoat)',
            video: 'https://www.youtube.com/embed/5qap5aO4i9A',
            notes: `
                <li><strong>Sơn phủ bóng (Topcoat):</strong> Giúp bảo vệ lớp decal không bị bong tróc và đồng bộ độ bóng/mờ cho mô hình.</li>
                <li><strong>Phân loại:</strong> Có 3 loại chính là Gloss (Bóng), Semi-Gloss (Bóng mờ) và Flat/Matte (Nhám lì).</li>
                <li><strong>Lưu ý thời tiết:</strong> Không xịt topcoat vào những ngày trời nồm ẩm hoặc mưa vì sẽ bị hiện tượng mốc trắng bề mặt (blushing).</li>
            `
        }
    };

    if (tutorialLinks.length > 0) {
        tutorialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Ngăn trình duyệt nhảy trang

                // 1. Xóa class active ở tất cả các nút và thêm vào nút vừa bấm
                tutorialLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');

                // 2. Lấy mã định danh (ví dụ: tutor-1, tutor-2...)
                const targetKey = link.getAttribute('data-target');
                const data = tutorialData[targetKey];

                if (data) {
                    // 3. Hiệu ứng mờ dần (Fade) đổi nội dung cho mượt
                    const contentBox = document.getElementById('tutorial-content');
                    contentBox.style.opacity = '0';
                    contentBox.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        // Thay đổi nội dung bên trong
                        document.getElementById('tutor-title').innerText = data.title;
                        document.getElementById('tutor-video').setAttribute('src', data.video);
                        document.getElementById('tutor-notes-list').innerHTML = data.notes;

                        // Hiện lại hiệu ứng
                        contentBox.style.opacity = '1';
                        contentBox.style.transform = 'translateY(0)';
                    }, 200);
                }
            });
        });
    }

    // --- XỬ LÝ BỘ LỌC TRANG BLOG ---
    const filterChips = document.querySelectorAll('.filter-chip');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterChips.length > 0 && blogCards.length > 0) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                // 1. Xóa class active của tất cả các nút lọc và thêm vào nút vừa bấm
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // 2. Xác định nội dung bộ lọc dựa vào chữ trên nút
                const filterText = chip.textContent.trim().toLowerCase();

                // 3. Duyệt qua từng bài viết để ẩn hoặc hiện
                blogCards.forEach(card => {
                    // Kiểm tra xem bài viết là loại Pass Đồ hay Kinh nghiệm dựa vào badge bên trong card
                    const badge = card.querySelector('.badge-type');
                    const badgeText = badge ? badge.textContent.trim().toLowerCase() : '';

                    if (filterText.includes('tất cả')) {
                        // Hiển thị tất cả
                        card.style.display = 'block';
                    } else if (filterText.includes('pass đồ') && badgeText.includes('pass đồ')) {
                        // Chỉ hiển thị bài pass đồ
                        card.style.display = 'block';
                    } else if (filterText.includes('kinh nghiệm') && badgeText.includes('kinh nghiệm')) {
                        // Chỉ hiển thị bài kinh nghiệm
                        card.style.display = 'block';
                    } else if (filterText.includes('review') && badgeText.includes('review')) {
                        // Dành cho tương lai nếu có thêm loại review
                        card.style.display = 'block';
                    } else {
                        // Các trường hợp không khớp thì ẩn đi
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 4. XỬ LÝ BỘ LỌC TRANG SHOP (HOÀN THIỆN TOÀN BỘ 6 NHÓM)

    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const quickTags = document.querySelectorAll('.quick-tag');
    const productCards = document.querySelectorAll('.product-card');
    const resetBtn = document.querySelector('.btn-reset-filter');

    function filterProducts() {
        const selectedBrands = [];
        const selectedScales = [];
        const selectedSeries = [];
        const selectedPrices = [];
        const selectedStatuses = [];
        const selectedFeatures = [];

        // Phân loại các checkbox đang được check vào từng mảng tiêu chí tương ứng
        filterCheckboxes.forEach(chk => {
            if (chk.checked && chk.value) {
                const values = chk.value.split(',').map(v => v.trim().toLowerCase());
                const groupTitle = chk.closest('.filter-group').querySelector('h4').textContent;

                if (groupTitle.includes('Hãng')) {
                    selectedBrands.push(...values);
                } else if (groupTitle.includes('Tỉ lệ') || groupTitle.includes('Phân khúc')) {
                    selectedScales.push(...values);
                } else if (groupTitle.includes('Vũ trụ') || groupTitle.includes('Series')) {
                    selectedSeries.push(...values);
                } else if (groupTitle.includes('Khoảng giá')) {
                    selectedPrices.push(...values);
                } else if (groupTitle.includes('Tình trạng')) {
                    selectedStatuses.push(...values);
                } else if (groupTitle.includes('Tính năng')) {
                    selectedFeatures.push(...values);
                }
            }
        });

        productCards.forEach(card => {
            const cardBrand = card.getAttribute('data-brand') || '';
            const cardScale = card.getAttribute('data-scale') || '';
            const cardSeries = card.getAttribute('data-series') || '';
            const cardPrice = parseInt(card.getAttribute('data-price')) || 0;
            const cardStatus = card.getAttribute('data-status') || '';
            const cardFeatures = card.getAttribute('data-features') || '';

            // Kiểm tra khớp từng nhóm (nếu nhóm đó không check gì thì mặc định là true)
            let matchesBrand = selectedBrands.length === 0 || selectedBrands.some(b => cardBrand.includes(b));
            let matchesScale = selectedScales.length === 0 || selectedScales.includes(cardScale);
            let matchesSeries = selectedSeries.length === 0 || selectedSeries.includes(cardSeries);
            let matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(cardStatus);

            let matchesPrice = true;
            if (selectedPrices.length > 0) {
                matchesPrice = selectedPrices.some(range => {
                    if (range === 'under-300') return cardPrice < 300000;
                    if (range === '300-800') return cardPrice >= 300000 && cardPrice <= 800000;
                    if (range === '800-2000') return cardPrice > 800000 && cardPrice <= 2000000;
                    if (range === 'over-2000') return cardPrice > 2000000;
                    return false;
                });
            }

            let matchesFeatures = true;
            if (selectedFeatures.length > 0) {
                // Sản phẩm phải có chứa tất cả các tính năng được tích chọn
                matchesFeatures = selectedFeatures.every(f => cardFeatures.includes(f));
            }

            // Sản phẩm phải thỏa mãn đồng thời tất cả các nhóm tiêu chí đang chọn (AND)
            if (matchesBrand && matchesScale && matchesSeries && matchesPrice && matchesStatus && matchesFeatures) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (filterCheckboxes.length > 0) {
        filterCheckboxes.forEach(chk => {
            chk.addEventListener('change', filterProducts);
        });
    }

    if (quickTags.length > 0) {
        quickTags.forEach(tag => {
            tag.addEventListener('click', () => {
                quickTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');

                const tagText = tag.textContent.trim().toLowerCase();

                productCards.forEach(card => {
                    const brand = card.querySelector('.product-brand') ? card.querySelector('.product-brand').textContent.trim().toLowerCase() : '';
                    const status = card.querySelector('.badge-status') ? card.querySelector('.badge-status').textContent.trim().toLowerCase() : '';

                    if (tagText.includes('tất cả')) {
                        card.style.display = 'flex';
                    } else if (brand.includes(tagText) || status.includes(tagText)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            filterCheckboxes.forEach(chk => chk.checked = false);
            productCards.forEach(card => card.style.display = 'flex');
            quickTags.forEach((t, index) => {
                if (index === 0) t.classList.add('active');
                else t.classList.remove('active');
            });
        });
    }

    // 5. XỬ LÝ TƯƠNG TÁC TRANG CHI TIẾT (Detail.html)

    // 1. TĂNG GIẢM SỐ LƯỢNG
    const qtyBtns = document.querySelectorAll('.qty-btn');
    const qtyInput = document.querySelector('.quantity-selector input');
    
    if (qtyBtns.length > 0 && qtyInput) {
        qtyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let currentVal = parseInt(qtyInput.value) || 1;
                // Kiểm tra xem nút bấm là trừ hay cộng dựa vào nội dung text của nút
                if (btn.textContent.trim() === '-') {
                    if (currentVal > 1) currentVal--;
                } else if (btn.textContent.trim() === '+') {
                    currentVal++;
                }
                qtyInput.value = currentVal;
            });
        });
    }

    // 2. CLICK ĐỔI ẢNH KHI CHỌN THUMBNAIL (NHIỀU GÓC CHỤP)
    const thumbs = document.querySelectorAll('.thumb-item');
    const mainImgBox = document.querySelector('.main-img-box');
    
    if (thumbs.length > 0 && mainImgBox) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                // Lấy icon từ thumbnail được bấm để đổi cho ảnh lớn
                const iconHtml = thumb.innerHTML;
                const badgeHtml = mainImgBox.querySelector('.badge-status') ? mainImgBox.querySelector('.badge-status').outerHTML : '';
                
                mainImgBox.innerHTML = `<div class="placeholder-main-img">${iconHtml}</div>` + badgeHtml;
            });
        });
    }

    // 3. HIỆU ỨNG KÍNH LÚP (ZOOM THEO CON CHUỘT) CHO ẢNH CHÍNH
    if (mainImgBox) {
        mainImgBox.addEventListener('mousemove', (e) => {
            const rect = mainImgBox.getBoundingClientRect();
            // Tính toán vị trí chuột theo % bên trong khung ảnh
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const innerImg = mainImgBox.querySelector('.placeholder-main-img');
            if (innerImg) {
                innerImg.style.transformOrigin = `${x}% ${y}%`;
                innerImg.style.transform = 'scale(1.8)'; // Phóng to 1.8 lần
            }
        });

        mainImgBox.addEventListener('mouseleave', () => {
            const innerImg = mainImgBox.querySelector('.placeholder-main-img');
            if (innerImg) {
                innerImg.style.transformOrigin = 'center center';
                innerImg.style.transform = 'scale(1)'; // Trở lại bình thường khi rê chuột ra ngoài
            }
        });
    }

    // 4. POPUP THÔNG BÁO ĐÃ THÊM VÀO GIỎ HÀNG (TOAST NOTIFICATION)
    const buyBtn = document.querySelector('.btn-buy-now');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            showToast("Đã thêm sản phẩm vào giỏ hàng thành công! 🛒");
        });
    }

    // Hàm tạo và hiển thị khung thông báo Pop-up góc màn hình
    function showToast(message) {
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.className = 'toast-show';
        
        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            toast.className = '';
        }, 3000);
    }

    //XỬ LÝ TABS CHUYỂN ĐỔI (DETAIL PAGE)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Xóa active tất cả các nút tab
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Lấy tên tab được chọn qua thuộc tính data-tab
                const targetTab = btn.getAttribute('data-tab');

                // Ẩn tất cả nội dung tab, chỉ hiện nội dung khớp với tab được bấm
                tabContents.forEach(content => {
                    if (content.id === `${targetTab}-content`) {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });
    }
});