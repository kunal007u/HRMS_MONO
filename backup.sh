#!/bin/sh

# Install required packages
yum install -y postgresql15 postgresql15-server aws-cli gzip cronie

# Ensure cron is enabled
service crond start

# Add the cron job to automate backups
echo "0 0 * * * sh -c '
timestamp=\$(date +\%Y-\%m-\%d_\%H:\%M:\%S) && \
backup_file=\"backup_\$timestamp.sql.gz\" && \
pg_dump -h db -U $DB_USER -d $DB_NAME -F p | gzip > /backup/\$backup_file && \
aws s3 cp /backup/\$backup_file s3://$S3_BUCKET_NAME/backups/ && \
find /backup -type f -name \"backup_*.sql.gz\" -mtime +${BACKUP_RETENTION_DAYS:-5} -exec rm {} \; && \
aws s3 ls s3://$S3_BUCKET_NAME/backups/ | awk -v d=\"\$(date -d \"-${BACKUP_RETENTION_DAYS:-5} days\" +\%Y-\%m-\%d)\" '\''\$1 < d {print \$4}'\'' | while read file; do aws s3 rm s3://$S3_BUCKET_NAME/backups/\$file; done
' " | crontab -

# Run cron in foreground
crond -n