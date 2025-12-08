/* script.js */

document.addEventListener('DOMContentLoaded', function() {

    // ----------------------------------
    // 1. 时间轴交互 (展开/折叠)
    // ----------------------------------

    const toggleButtons = document.querySelectorAll('.toggle-details');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取紧邻的详情内容 div
            const detailsContent = this.nextElementSibling;

            if (detailsContent.classList.contains('hidden')) {
                // 展开内容
                detailsContent.classList.remove('hidden');
                this.textContent = '收起详情';
                detailsContent.classList.add('active');
            } else {
                // 折叠内容
                detailsContent.classList.add('hidden');
                this.textContent = '查看详情';
                detailsContent.classList.remove('active');
            }
        });
    });

    // ----------------------------------
    // 2. 趣味测试逻辑
    // ----------------------------------

    const quizForm = document.getElementById('mahjong-quiz-form');
    const quizResult = document.getElementById('quiz-result');

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 简单模拟结果逻辑 (根据第一个问题结果)
        const q1Answer = document.querySelector('input[name="q1"]:checked');
        let resultText = '';

        if (q1Answer) {
            if (q1Answer.value === 'A') {
                resultText = '你是 **白板**！象征着无私和多变，在牌局中是变化最多的角色。';
            } else { // q1Answer.value === 'B'
                resultText = '你是 **一万**！象征着稳定和起始，在牌局中是构建一切的基础。';
            }
        } else {
            resultText = '请至少选择一个答案才能查看结果哦！';
        }

        quizResult.innerHTML = resultText;
        quizResult.classList.remove('hidden');
        quizResult.scrollIntoView({ behavior: 'smooth' });
    });

    // ----------------------------------
    // 3. 留言板功能
    // ----------------------------------

    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    // 假设留言数据存储在浏览器（仅用于演示，实际网站需要后端数据库）
    let comments = [
        { username: "游客001", content: "麻将的历史比我想象的要悠久得多！很棒的网站！", timestamp: new Date().toLocaleString() },
        { username: "麻友小张", content: "四川血战到底确实刺激，期待更多地方规则介绍！", timestamp: new Date().toLocaleString() }
    ];

    // 初始化渲染现有留言
    function renderComments() {
        commentsList.innerHTML = ''; // 清空现有内容
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-entry');
            commentDiv.innerHTML = `
                <p><strong>${comment.username}</strong> <span style="font-size:0.8em; color:#999;">(${comment.timestamp})</span></p>
                <p>${comment.content}</p>
            `;
            commentsList.prepend(commentDiv); // 新留言置顶
        });
    }

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const commentInput = document.getElementById('comment');

        const newComment = {
            username: usernameInput.value || '匿名用户',
            content: commentInput.value,
            timestamp: new Date().toLocaleString()
        };

        // 将新留言添加到数组
        comments.push(newComment);

        // 重新渲染留言列表
        renderComments();

        // 清空表单
        usernameInput.value = '';
        commentInput.value = '';

        alert('留言提交成功！');
    });

    // 页面加载时渲染一次
    renderComments();

});