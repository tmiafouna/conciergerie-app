const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  
  // En production, ne pas révéler les détails de l'erreur
  const message = process.env.NODE_ENV === 'production' 
    ? "Erreur interne du serveur" 
    : err.message;
  
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;