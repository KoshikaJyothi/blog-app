import { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { Card, Loading, EmptyState, Alert } from '../components/Common';
import { ArticleCard } from '../components/ArticleCard';

const AllArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userService.getArticles();
      console.log('AllArticlesPage API response:', response);
      setArticles(response.data.articles || []);
    } catch (err) {
      console.error('AllArticlesPage API error:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading text="Loading articles..." />;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">All Articles</h1>
        {error && <Alert message={error} type="error" />}
        {articles.length === 0 ? (
          <EmptyState message="No articles published yet" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllArticlesPage;
