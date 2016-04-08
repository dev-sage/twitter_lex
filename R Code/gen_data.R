word_list <- c("a", "and", "the", "hello", "car", "dog")
counts <- c(27.5, 53, 73, 88, 98, 100)
i <- 1
for(word in word_list) {
	assign(word, rnorm(250, counts[i], 1))
	i <- i + 1
}

word_frame <- data.frame(a, and, the, hello, car, dog)
i<- 1
for(word in word_list) {
	assign(word, rnorm(250, counts[i], 5))
	i <- i + 1
}

word_frame2 <- data.frame(a, and, the, hello, car, dog)

word_frame <- rbind(word_frame, word_frame2)


write.csv(word_frame, file = "~/Google Drive/Twitter Lexicon/twitter_lex/data/word_frame.csv", row.names = FALSE)


