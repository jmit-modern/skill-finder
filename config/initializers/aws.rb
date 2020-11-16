Aws.config.update({
  region: 'ap-northeast-1',
  credentials: Aws::Credentials.new(ENV['S3_ACCESS_KEY'], ENV['S3_SECRET_KEY']),
})

S3_BUCKET = Aws::S3::Resource.new.bucket("scrumsourcing")

# s3 = Aws::S3::Resource.new(
#          credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'],  ENV['AWS_SECRET_ACCESS_KEY']),
#          region: 'us-west-1'
#        )

#        obj = s3.bucket(ENV['S3_BUCKET']).object('key')