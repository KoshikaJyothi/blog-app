import { Link } from 'react-router-dom'
import { Card } from './Common'

export const ArticleCard = ({ article }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-200 border-0 shadow-md hover:-translate-y-1">
      <div className="p-7">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-[#c0392b] bg-red-100 px-3 py-1 rounded-full shadow-sm">
            {article.category}
          </span>
          <span className="text-xs text-gray-400 italic">{formatDate(article.createdAt)}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-base line-clamp-3 mb-5">
          {article.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-3">
            {article.author?.profileimgurl ? (
              <img src={article.author.profileimgurl} alt={article.author.name} className="w-9 h-9 rounded-full border-2 border-[#c0392b] object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-base font-bold">
                {article.author?.name?.charAt(0) || 'A'}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-800">{article.author?.name}</p>
              <p className="text-xs text-gray-500">{article.comments?.length || 0} comments</p>
            </div>
          </div>
          <Link to={`/articles/${article._id}`} className="text-[#c0392b] hover:underline text-base font-semibold">
            Read &rarr;
          </Link>
        </div>
      </div>
    </Card>
  );
}
