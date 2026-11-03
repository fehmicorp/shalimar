package main

type Config struct {
	Port              int    `yaml:"port" json:"port" env:"S3_APP_PORT" envDefault:"9098"`
	AccessKeyID       string `yaml:"access_key_id" json:"access_key_id" env:"S3_APP_ACCESS_KEY_ID" envDefault:"minioadmin"`
	SecretAccessKey   string `yaml:"secret_access_key" json:"secret_access_key" env:"S3_APP_SECRET_ACCESS_KEY" envDefault:"minioadmin"`
	SecretAccessToken string `yaml:"secret_access_token" json:"secret_access_token" env:"S3_APP_SECRET_ACCESS_TOKEN" envDefault:"minioadmin"`
	AccessTokenHeader string `yaml:"access_token_header" json:"access_token_header" env:"S3_APP_SECRET_ACCESS_TOKEN_HEADER" envDefault:"X-SecretAccessToken"`
	UseSSL            bool   `yaml:"use_ssl" json:"use_ssl" env:"S3_APP_USE_SSL" envDefault:"false"`
	MaxConnections    int    `yaml:"max_connections" json:"max_connections" env:"S3_APP_MAX_CONNECTIONS" envDefault:"10"`
	DebugMode         bool   `yaml:"debug_mode" json:"debug_mode" env:"S3_APP_DEBUG_MODE" envDefault:"false"`
	Timeout           string `yaml:"timeout" json:"timeout" env:"S3_APP_TIMEOUT" envDefault:"30s"`
	Region            string `yaml:"region" json:"region" env:"S3_APP_REGION" envDefault:"us-east-1"`
	LogLevel          string `yaml:"log_level" json:"log_level" env:"S3_APP_LOG_LEVEL" envDefault:"info"`
	BackupDir         string `yaml:"backup_dir" json:"backup_dir" env:"S3_APP_BACKUP_DIR" envDefault:"/backup"`
	BackupEnabled     bool   `yaml:"backup_enabled" json:"backup_enabled" env:"S3_APP_BACKUP_ENABLED" envDefault:"true"`
	BackupInterval    int    `yaml:"backup_interval" json:"backup_interval" env:"S3_APP_BACKUP_INTERVAL" envDefault:"86400"`
	DataDir           string `yaml:"data_dir" json:"data_dir" env:"S3_APP_DATA_DIR" envDefault:"/data"`
}
