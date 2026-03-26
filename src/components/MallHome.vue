<template>
    <div class="mall-home">
        <!-- Navigation -->
        <nav class="mall-nav">
            <div class="nav-container">
                <div class="nav-brand">
                    <span class="brand-icon">◆</span>
                    <span class="brand-text">LUXE</span>
                </div>
                <ul class="nav-links">
                    <li><a href="#" class="active">首页</a></li>
                    <li><a href="#">女士</a></li>
                    <li><a href="#">男士</a></li>
                    <li><a href="#">配饰</a></li>
                    <li><a href="#">美妆</a></li>
                </ul>
                <div class="nav-actions">
                    <span class="nav-icon">◇</span>
                    <span class="nav-icon">☐</span>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-bg"></div>
            <div class="hero-content">
                <p class="hero-subtitle">2026 春季系列</p>
                <h1 class="hero-title">演绎<br>极致之美</h1>
                <button class="hero-btn">探索Collection</button>
            </div>
            <div class="hero-image">
                <div class="image-frame">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Fashion">
                </div>
            </div>
        </section>

        <!-- Category Section -->
        <section class="category-section">
            <div class="section-header">
                <h2 class="section-title">精选品类</h2>
                <p class="section-desc">发现与众不同的优雅</p>
            </div>
            <div class="category-grid">
                <div class="category-card card-1">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" alt="女装">
                    <div class="category-overlay">
                        <span class="category-name">女装</span>
                        <span class="category-arrow">→</span>
                    </div>
                </div>
                <div class="category-card card-2">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="男装">
                    <div class="category-overlay">
                        <span class="category-name">男装</span>
                        <span class="category-arrow">→</span>
                    </div>
                </div>
                <div class="category-card card-3">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" alt="配饰">
                    <div class="category-overlay">
                        <span class="category-name">配饰</span>
                        <span class="category-arrow">→</span>
                    </div>
                </div>
                <div class="category-card card-4">
                    <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80" alt="美妆">
                    <div class="category-overlay">
                        <span class="category-name">美妆</span>
                        <span class="category-arrow">→</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Products Section -->
        <section class="products-section">
            <div class="section-header">
                <h2 class="section-title">热门单品</h2>
                <p class="section-desc">不容错过的时尚精选</p>
            </div>
            <div class="products-grid">
                <div class="product-card" v-for="product in products" :key="product.id">
                    <div class="product-image">
                        <img :src="product.image" :alt="product.name">
                        <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
                        <div class="product-actions">
                            <button class="action-btn">♡</button>
                            <button class="action-btn">☐</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <p class="product-brand">{{ product.brand }}</p>
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-price">¥{{ product.price }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Banner Section -->
        <section class="banner-section">
            <div class="banner-content">
                <p class="banner-tag">会员专享</p>
                <h2 class="banner-title">春日焕新<br>全场8折起</h2>
                <button class="banner-btn">立即选购</button>
            </div>
            <div class="banner-decoration">
                <div class="deco-circle"></div>
                <div class="deco-line"></div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="mall-footer">
            <div class="footer-content">
                <div class="footer-brand">
                    <span class="brand-icon">◆</span>
                    <span class="brand-text">LUXE</span>
                </div>
                <div class="footer-links">
                    <div class="link-group">
                        <h4>购物</h4>
                        <a href="#">女士</a>
                        <a href="#">男士</a>
                        <a href="#">配饰</a>
                    </div>
                    <div class="link-group">
                        <h4>帮助</h4>
                        <a href="#">配送</a>
                        <a href="#">退换</a>
                        <a href="#">客服</a>
                    </div>
                    <div class="link-group">
                        <h4>关于</h4>
                        <a href="#">品牌</a>
                        <a href="#">门店</a>
                        <a href="#">招聘</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 LUXE 保留所有权利</p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'MallHome',
    data() {
        return {
            products: [
                {
                    id: 1,
                    brand: 'MAX MARA',
                    name: '经典羊绒大衣',
                    price: '28,800',
                    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&q=80',
                    badge: '新品'
                },
                {
                    id: 2,
                    brand: 'BOTTEGA VENETA',
                    name: '编织手提包',
                    price: '19,500',
                    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
                    badge: ''
                },
                {
                    id: 3,
                    brand: 'GUCCI',
                    name: 'GG Marmont链条包',
                    price: '22,000',
                    image: 'https://images.unsplash.com/photo-1584338853933-5e1b2d1d1d1d?w=400&q=80',
                    badge: '热卖'
                },
                {
                    id: 4,
                    brand: 'LANVIN',
                    name: '真丝连衣裙',
                    price: '15,800',
                    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
                    badge: ''
                }
            ]
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.mall-home {
    --primary: #1a1a1a;
    --secondary: #666;
    --accent: #c9a96e;
    --bg-light: #faf9f7;
    --bg-dark: #0f0f0f;
    --text-dark: #1a1a1a;
    --text-light: #faf9f7;
    font-family: 'Noto Sans SC', 'PingFang SC', sans-serif;
    background: var(--bg-light);
    color: var(--text-dark);
    overflow-x: hidden;
}

/* Navigation */
.mall-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(250, 249, 247, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 60px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.brand-icon {
    font-size: 24px;
    color: var(--accent);
}

.brand-text {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 8px;
    color: var(--primary);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 48px;
}

.nav-links a {
    text-decoration: none;
    color: var(--secondary);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: width 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
    color: var(--primary);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

.nav-actions {
    display: flex;
    gap: 24px;
}

.nav-icon {
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s ease;
}

.nav-icon:hover {
    color: var(--accent);
}

/* Hero Section */
.hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 120px 60px 60px;
    position: relative;
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 55%;
    height: 100%;
    background: linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%);
    z-index: -1;
}

.hero-content {
    flex: 1;
    max-width: 600px;
    animation: slideUp 1s ease-out;
}

.hero-subtitle {
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--accent);
    margin-bottom: 24px;
    font-weight: 500;
}

.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 96px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--primary);
    margin-bottom: 48px;
}

.hero-btn {
    background: var(--primary);
    color: var(--text-light);
    border: none;
    padding: 18px 48px;
    font-size: 13px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: inherit;
}

.hero-btn:hover {
    background: var(--accent);
    transform: translateY(-2px);
}

.hero-image {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    animation: fadeIn 1.2s ease-out 0.3s both;
}

.image-frame {
    width: 480px;
    height: 640px;
    overflow: hidden;
    position: relative;
}

.image-frame::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--accent);
    z-index: -1;
}

.image-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
}

.image-frame:hover img {
    transform: scale(1.05);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Category Section */
.category-section {
    padding: 120px 60px;
    background: white;
}

.section-header {
    text-align: center;
    margin-bottom: 80px;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: 48px;
    font-weight: 400;
    color: var(--primary);
    margin-bottom: 16px;
}

.section-desc {
    font-size: 14px;
    color: var(--secondary);
    letter-spacing: 4px;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    max-width: 1400px;
    margin: 0 auto;
}

.category-card {
    position: relative;
    height: 420px;
    overflow: hidden;
    cursor: pointer;
}

.category-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.category-card:hover img {
    transform: scale(1.08);
}

.category-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40px 24px;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.category-name {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: white;
}

.category-arrow {
    font-size: 24px;
    color: white;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
}

.category-card:hover .category-arrow {
    opacity: 1;
    transform: translateX(0);
}

.card-1 { animation: slideUp 0.8s ease-out 0.1s both; }
.card-2 { animation: slideUp 0.8s ease-out 0.2s both; }
.card-3 { animation: slideUp 0.8s ease-out 0.3s both; }
.card-4 { animation: slideUp 0.8s ease-out 0.4s both; }

/* Products Section */
.products-section {
    padding: 120px 60px;
    background: var(--bg-light);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    max-width: 1400px;
    margin: 0 auto;
}

.product-card {
    cursor: pointer;
    animation: fadeIn 0.8s ease-out both;
}

.product-card:nth-child(1) { animation-delay: 0.1s; }
.product-card:nth-child(2) { animation-delay: 0.2s; }
.product-card:nth-child(3) { animation-delay: 0.3s; }
.product-card:nth-child(4) { animation-delay: 0.4s; }

.product-image {
    position: relative;
    height: 380px;
    overflow: hidden;
    background: #f0efed;
    margin-bottom: 20px;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.04);
}

.product-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: var(--primary);
    color: white;
    padding: 6px 14px;
    font-size: 11px;
    letter-spacing: 2px;
}

.product-actions {
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
}

.product-card:hover .product-actions {
    opacity: 1;
    transform: translateY(0);
}

.action-btn {
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background: var(--accent);
    color: white;
}

.product-brand {
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--secondary);
    margin-bottom: 8px;
}

.product-name {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary);
    margin-bottom: 12px;
}

.product-price {
    font-size: 18px;
    color: var(--primary);
    font-weight: 500;
}

/* Banner Section */
.banner-section {
    height: 500px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.banner-content {
    text-align: center;
    z-index: 2;
    animation: fadeIn 1s ease-out;
}

.banner-tag {
    font-size: 12px;
    letter-spacing: 6px;
    color: var(--accent);
    margin-bottom: 24px;
}

.banner-title {
    font-family: 'Playfair Display', serif;
    font-size: 72px;
    font-weight: 400;
    color: var(--text-light);
    line-height: 1.2;
    margin-bottom: 48px;
}

.banner-btn {
    background: transparent;
    color: var(--text-light);
    border: 1px solid var(--text-light);
    padding: 18px 56px;
    font-size: 13px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: inherit;
}

.banner-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
}

.banner-decoration {
    position: absolute;
    width: 100%;
    height: 100%;
}

.deco-circle {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    height: 400px;
    border: 1px solid rgba(201, 169, 110, 0.3);
    border-radius: 50%;
    animation: rotate 30s linear infinite;
}

.deco-line {
    position: absolute;
    left: 5%;
    top: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(transparent, rgba(201, 169, 110, 0.3), transparent);
}

@keyframes rotate {
    from { transform: translateY(-50%) rotate(0deg); }
    to { transform: translateY(-50%) rotate(360deg); }
}

/* Footer */
.mall-footer {
    background: var(--bg-dark);
    color: var(--text-light);
    padding: 80px 60px 40px;
}

.footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 60px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.footer-brand .brand-icon {
    font-size: 28px;
}

.footer-brand .brand-text {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 8px;
    color: var(--text-light);
}

.footer-links {
    display: flex;
    gap: 120px;
}

.link-group h4 {
    font-size: 12px;
    letter-spacing: 3px;
    margin-bottom: 24px;
    color: var(--accent);
}

.link-group a {
    display: block;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 14px;
    transition: color 0.3s ease;
}

.link-group a:hover {
    color: var(--text-light);
}

.footer-bottom {
    text-align: center;
    padding-top: 40px;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    letter-spacing: 1px;
}
</style>
